import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, Dimensions, ScrollView } from 'react-native';
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
} from 'accordion-collapse-react-native';
import * as Template from '../components/Template';
import { getData } from '../services/async-storage-service';
import { ProgressCircle } from 'react-native-svg-charts';
import Icon from '../components/Icon';

import { badgeColors } from '../constants';

const chartConfig = {
  color: (opacity = 0) => `rgba(26, 255, 146, ${opacity})`,
};

const Report = () => {
  const [report, setReport] = useState([]);
  const [activeAccordions, setActiveAccordions] = useState([]);
  const [chartData, setChartData] = useState(null);
  const height = Dimensions.get('window').height - 200;

  useEffect(() => {
    getData('report').then(
      (data) => {
        let sortedData = [];
        if (data && data.length > 0) {
          data.map((d) => {
            sortedData.unshift(d);
          });
        }
        setReport(sortedData);
        setActiveAccordions([...new Array(report.length).fill(false)]);
        const result =
          data &&
          data.reduce(
            (acc, r) => {
              if (r.passed) {
                acc[0] += 1;
              } else {
                acc[1] += 1;
              }
              return acc;
            },
            [0, 0]
          );
        if (result) {
          setChartData([
            {
              name: 'Passed',
              attempts: result[0],
              color: 'teal',
              legendFontColor: '#fff',
              legendFontSize: 12,
            },
            {
              name: 'Failed',
              attempts: result[1],
              color: 'tomato',
              legendFontColor: '#fff',
              legendFontSize: 12,
            },
          ]);
        } else {
          setChartData([]);
        }
      },
      (err) => console.log(err)
    );
  }, []);

  const appendCategories = (category) => {
    const sortedCategory = Object.entries(category)
      .sort(([, a], [, b]) => {
        const rwidtha = parseInt((a.rights * 100) / (a.rights + a.wrongs), 10);
        const rwidthb = parseInt((b.rights * 100) / (b.rights + b.wrongs), 10);
        return rwidtha - rwidthb;
      })
      .reduce((r, [k, v]) => ({ ...r, [k]: v }), {});

    return Object.keys(sortedCategory).map((keyName) => {
      const r = sortedCategory[keyName].rights;
      const w = sortedCategory[keyName].wrongs;
      const rwidth = parseInt((r * 100) / (r + w), 10);

      return (
        <View style={[styles.row]} key={Math.random()}>
          <View style={[styles.row]}>
            <Text
              style={{
                color: '#fff',
                fontSize: 13,
                fontWeight: '200',
                paddingTop: 4,
                paddingBottom: 2,
                paddingRight: 5,
                letterSpacing: 1,
              }}
            >
              {keyName}:{' '}
            </Text>
            <Text
              style={{
                color: '#fff',
                fontSize: 13,
                fontWeight: '400',
                paddingTop: 4,
                paddingBottom: 2,
              }}
            >
              {rwidth}%
            </Text>
          </View>
          <View style={[styles.row]}>
            {sortedCategory[keyName].rights ? (
              <View
                style={{
                  backgroundColor: badgeColors[keyName][1],
                  borderRadius: 5,
                  height: 3,
                  width: `${rwidth}%`,
                  opacity: 0.7,
                }}
              >
                <Text></Text>
              </View>
            ) : null}
            <View
              style={{
                backgroundColor: 'rgba(0,0,0,.2)',
                borderRadius: 5,
                height: 3,
                width: `${100 - rwidth}%`,
              }}
            >
              <Text></Text>
            </View>
          </View>
        </View>
      );
    });
  };

  const accordionHeader = (item, idx) => {
    const max = item.percentage ? `${item.percentage}%` : undefined;
    const min = 100 - item.percentage ? `${100 - item.percentage}%` : undefined;
    return (
      <View style={[styles.row, { paddingVertical: 3 }]}>
        <View style={[styles.row, { width: '100%', paddingVertical: 2 }]}>
          <Text
            style={{
              fontWeight: '300',
              color: '#fff',
              fontSize: 12,
              paddingVertical: 2,
            }}
          >
            {item.date}
          </Text>
          <View style={styles.row}>
            <Text
              style={{
                fontWeight: '500',
                color: '#fff',
                fontSize: 12,
                paddingHorizontal: 5,
              }}
            >
              {item.percentage} %
            </Text>
            <Icon
              name={activeAccordions[idx] ? 'angleUp' : 'angleDown'}
              color="#fff"
              size={16}
              overrides={{ padding: 0 }}
            />
          </View>
        </View>
        <View style={[styles.row]}>
          {max && (
            <View
              style={{
                backgroundColor: chartConfig.color(0.4),
                borderRadius: 50,
                width: max,
                marginVertical: 2,
                maxHeight: 6,
              }}
            >
              <Text></Text>
            </View>
          )}
          {min && (
            <View
              style={{
                backgroundColor: '#1C0732',
                borderRadius: 50,
                width: min,
                marginVertical: 2,
                maxHeight: 6,
              }}
            >
              <Text></Text>
            </View>
          )}
        </View>
      </View>
    );
  };

  const accordionBody = (item) => {
    const color = item.passed ? '#52BD94' : 'tomato';
    return (
      <View
        style={{
          padding: 15,
          backgroundColor: 'rgba(0,0,0,.2)',
          borderRadius: 5,
        }}
      >
        <View style={[styles.row]}>
          <Text style={{ color: '#fff', paddingBottom: 5, flex: 2 }}>
            Total corrects: {item.totalCorrects} of {item.totalQuestions}
          </Text>
          <Text style={{ color: color, paddingRight: 5 }}>
            {item.passed ? 'Passed' : 'Failed'}
          </Text>
          <Icon
            name={item.passed ? 'check' : 'times'}
            color={color}
            size={16}
            overrides={{ padding: 0, paddingTop: 1 }}
          />
        </View>
        <View style={[styles.row]}></View>
        <View>
          {item.questionCategories &&
            item.questionCategories.map((c) => appendCategories(c))}
        </View>
      </View>
    );
  };

  const toggleAccordion = (idx) => {
    const accs = new Array(report.length).fill(false);
    if (!activeAccordions[idx]) {
      accs[idx] = true;
    }
    setActiveAccordions([...accs]);
  };

  const getPercentage = (percent) => {
    const percentage =
      (100 * chartData[0].attempts) /
      (chartData[0].attempts + chartData[1].attempts);
    if (percent) {
      return parseInt(percentage, 10);
    }
    return percentage / 100;
  };

  return (
    <Template.Base>
      <View key={Math.random()} style={{ maxHeight: 250 }}>
        {chartData && chartData.length > 0 && (
          <View>
            <Text style={styles.textHeader}>My progress</Text>
            <View style={{ paddingBottom: 20 }}>
              <Text
                style={{
                  position: 'absolute',
                  top: 55,
                  color: 'white',
                  fontSize: 58,
                  fontWeight: '100',
                  width: '100%',
                  textAlign: 'center',
                }}
              >
                {getPercentage(true)}%
              </Text>
              <ProgressCircle
                style={{ height: 185 }}
                progress={getPercentage()}
                progressColor="rgb(134, 65, 244)"
                backgroundColor="#1C0732"
                strokeWidth={8}
                animate={true}
              />
            </View>
          </View>
        )}
        {chartData && chartData.length === 0 && (
          <View
            style={{
              height: height,
              justifyContent: 'center',
            }}
          >
            <Icon
              name={'inbox'}
              size={30}
              overrides={{ padding: 0, alignSelf: 'center' }}
            />
            <Text style={[styles.textHeader, { alignSelf: 'center' }]}>
              No Data Available
            </Text>
          </View>
        )}
      </View>
      <ScrollView key={Math.random()} fadingEdgeLength={35} initialNumToRender={10}>
        {chartData &&
          chartData.length > 0 &&
          report.map((item, idx) => (
            <Collapse
              key={Math.random()}
              isExpanded={activeAccordions[idx]}
              onToggle={() => toggleAccordion(idx)}
            >
              <CollapseHeader>{accordionHeader(item, idx)}</CollapseHeader>
              <CollapseBody>{accordionBody(item)}</CollapseBody>
            </Collapse>
          ))}
      </ScrollView>
    </Template.Base>
  );
};

const styles = StyleSheet.create({
  content: {
    color: '#fff',
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  textHeader: {
    fontSize: 20,
    fontWeight: '500',
    paddingVertical: 15,
    textAlign: 'center',
    color: '#fff',
  },
});

export default Report;

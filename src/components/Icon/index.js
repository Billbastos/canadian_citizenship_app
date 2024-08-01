import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import {
  Home,
  Check,
  PieChart,
  Settings,
  X,
  FileText,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Trash2,
  Loader,
  Inbox,
  ArrowRight,
  Clock,
  Coffee,
  Download,
  ExternalLink,
} from 'react-native-feather';

const getIcon = {
  home: (props) => <Home {...props} />,
  check: (props) => <Check {...props} />,
  times: (props) => <X {...props} />,
  test: (props) => <FileText {...props} />,
  settings: (props) => <Settings {...props} />,
  report: (props) => <PieChart {...props} />,
  angleRight: (props) => <ChevronRight {...props} />,
  angleDown: (props) => <ChevronDown {...props} />,
  angleUp: (props) => <ChevronUp {...props} />,
  trash: (props) => <Trash2 {...props} />,
  loader: (props) => <Loader {...props} />,
  inbox: (props) => <Inbox {...props} />,
  next: (props) => <ArrowRight {...props} />,
  clock: (props) => <Clock {...props} />,
  coffee: (props) => <Coffee {...props} />,
  download: (props) => <Download {...props} />,
  external: (props) => <ExternalLink {...props} />,
};

const Icon = ({
  name,
  size = 25,
  color = 'white',
  label,
  stroke = 2,
  overrides,
}) => {
  return (
    <View style={[styles.icon, { ...overrides }]}>
      {getIcon[name]({
        stroke: color,
        width: size,
        height: size,
        strokeWidth: stroke,
      })}
      {label && <Text style={{ color: color, fontSize: 10 }}>{label}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  icon: {
    padding: 5,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
});

export default Icon;

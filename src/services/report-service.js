import { getData, storeData } from './async-storage-service';

const formatDate = (date) => {
  const months = [
    'Jan',
    'Fev',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Ago',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  const d = new Date(date);
  const ye = d.getFullYear();
  const mo = months[d.getMonth()];
  const da = d.getDate() <= 9 ? `0${d.getDate()}` : d.getDate();
  const hour = d.getHours() <= 9 ? `0${d.getHours()}` : d.getHours();
  const minutes = d.getMinutes() <= 9 ? `0${d.getMinutes()}` : d.getMinutes();
  return `${mo} ${da}, ${ye} : ${hour}:${minutes}`;
};

const saveReport = async (data) => {
  const report = await getData('report');
  let lastId = 0;

  const dataToSave = data.reduce((acc, question) => {
    // return array of categories on this format [{'people': {right: 0, wrong: 0}}]
    // return passed or failed based on iscorrect sum > 75%

    const correctCategories = new Set(acc.mostCorrectCategories);
    const wrongCategories = new Set(acc.leastCorrectCategories);

    const scoreQuestions = acc.questionCategories || [];

    question.categories.map((cat) => {
      if (scoreQuestions.length) {
        scoreQuestions.map((quest) => {
          if (!quest[cat]) {
            quest[cat] = { rights: 0, wrongs: 0 };
          }
          if (question.isCorrect) {
            quest[cat].rights += 1;
          } else {
            quest[cat].wrongs += 1;
          }
        });
      } else {
        const score = { [cat]: { rights: 0, wrongs: 0 } };
        if (question.isCorrect) {
          score[cat].rights = 1;
        } else {
          score[cat].wrongs = 1;
        }
        scoreQuestions.push(score);
      }
    });

    let totalCorrects = acc.totalCorrects || 0;

    if (question.isCorrect) {
      totalCorrects += 1;
      correctCategories.add(question.categories.join());
    } else {
      wrongCategories.add(question.categories.join());
    }

    const total = Math.round((totalCorrects * 100) / data.length);
    const rights =
      correctCategories.size !== 0 ? Array.from(correctCategories) : '';
    const wrongs =
      wrongCategories.size !== 0 ? Array.from(wrongCategories) : '';

    return (acc = {
      totalQuestions: data.length,
      totalCorrects,
      mostCorrectCategories: rights,
      leastCorrectCategories: wrongs,
      questionCategories: scoreQuestions,
      passed: total >= 75,
      percentage: total,
    });
  }, {});

  if (report) {
    lastId = report[report.length - 1].reportId;
    report.push({
      reportId: lastId + 1,
      date: formatDate(new Date()),
      ...dataToSave,
    });
    await storeData('report', report);
  } else {
    await storeData('report', [
      { reportId: 0, date: formatDate(new Date()), ...dataToSave },
    ]);
  }
};

export { saveReport };

export const monthMap = {
  Jan: "01",
  Feb: "02",
  Mar: "03",
  Apr: "04",
  May: "05",
  Jun: "06",
  Jul: "07",
  Aug: "08",
  Sep: "09",
  Oct: "10",
  Nov: "11",
  Dec: "12",
};

export const getMonthValue = (row, monthValue, idx) => {
  let month = monthValue.split("-")[0]; //"Jan-24",... ---> "Jan"
  const monthNumber = monthMap[month]; //"01","02",..
  let val = 0;
  row.entries?.filter((item) => {
    if (item?.budgetMonth === monthNumber?.toString()) {
      val = parseFloat(item.estimatedBudget);
      // return item;
    }
  });

  // return value[0]?.estimatedBudget;
  return val;
};

export const calculateRowTotal = (row, isActual) => {
  let totalHour = 160; //20 days * 8 hours = 160 Hour Rate
  return row.entries?.reduce(
    (acc, curr) => acc + (parseFloat(curr?.estimatedBudget) || 0),

    0
  );
};
export const calculateTotals = (data, months, commonMonthMap, tabName) => {
  let totalHour = 160; //20 days * 8 hours = 160 Hour Rate
  let totals = [];
  for (let month of months) {
    let monthNo = commonMonthMap[month.split("-")[0]];
    totals.push({ month: monthNo, value: 0 });
  }

  data?.forEach((row) => {
    row.entries?.forEach((monthValue, index) => {
      let colMonth = Object.values(commonMonthMap)
        ?.filter((val) => monthValue.budgetMonth === val)
        ?.toString();
      totals = totals.map((item) => {
        if (item.month === colMonth) {
          item.value += parseFloat(monthValue.estimatedBudget) || 0;
          // if (row.costCenter === "R") {
          //   item.value +=
          //     parseFloat(monthValue.estimatedBudget) *
          //       totalHour *
          //       row.hrRate || 0;
          // } else if (row.costCenter === "C") {
          //   item.value +=
          //     parseFloat(monthValue.estimatedBudget * row.quantity) || 0;
          // } else {
          //   item.value += parseFloat(monthValue.estimatedBudget) || 0;
          // }
        }
        return item;
      });
    });
  });

  return totals;
};

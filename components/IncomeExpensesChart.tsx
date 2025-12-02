import CalenderIcon from '@/assets/icons/CalenderIcon';
import SearchIcon from '@/assets/icons/SearchIcon';
import React from 'react';
import { Dimensions, Text, TouchableOpacity, View } from 'react-native';
import Svg, { Line } from 'react-native-svg';



const { width } = Dimensions.get('window');
const CHART_WIDTH = width * 0.85; // Chiều rộng biểu đồ chiếm 85% màn hình
const CHART_HEIGHT = 150; 

// Dữ liệu mẫu
const chartData = [
  { day: 'Mon', income: 4000, expenses: 7500 },
  { day: 'Tue', income: 1500, expenses: 2800 },
  { day: 'Wed', income: 7000, expenses: 3000 },
  { day: 'Thu', income: 500, expenses: 4500 },
  { day: 'Fri', income: 10000, expenses: 8500 },
  { day: 'Sat', income: 2000, expenses: 200 },
  { day: 'Sun', income: 1000, expenses: 5500 },
];

// Hàm lấy giá trị max để tính tỷ lệ
const getMaxYValue = (data:any) => {
  let max = 0;
  data.forEach((item: any) => {
    if (item.income > max) max = item.income;
    if (item.expenses > max) max = item.expenses;
  });
  // Đảm bảo giá trị maxChartValue là số tròn (ví dụ: 10000, 15000)
  return Math.ceil(max / 5000) * 5000; 
};

const maxChartValue = getMaxYValue(chartData);
// Các nhãn trục Y
const yLabels = [0, maxChartValue / 3, (maxChartValue / 3) * 2, maxChartValue];


const IncomeExpensesChart = () => {
  return (
    <View 
      className="bg-lightGreen rounded-2xl p-5 shadow-lg shadow-black/10 border-r-4 border-r-[#DAF7E1]"
      style={{ width: CHART_WIDTH }} // Sử dụng style prop cho kích thước động
    >
      {/* Header */}
      <View className="flex-row justify-between items-center mb-5">
        <Text className="text-xl font-bold text-gray-800">
          Income & Expenses
        </Text>
        <View className="flex-row">
          <TouchableOpacity className="bg-primary rounded-full p-2.5 ml-2 shadow-sm shadow-black/5">
            <SearchIcon/>
          </TouchableOpacity>
          <TouchableOpacity className="bg-primary rounded-full p-2.5 ml-2 shadow-sm shadow-black/5">
            <CalenderIcon/>
          </TouchableOpacity>
        </View>
      </View>

      {/* Chart Area */}
      <View className="flex-row items-end h-[150px] mb-2">
        {/* Y-axis Labels */}
        <View className="justify-between h-full mr-2 pb-1">
            {yLabels.reverse().map((label, index) => (
                <Text key={index} className="text-xs text-gray-500">
                {label >= 1000 
                    ? `${Math.round(label / 1000)}k` // <-- Dùng Math.round()
                    : label
                }
                </Text>
            ))}
        </View>

        {/* Chart Grid and Bars */}
        <View className="flex-1 h-full relative">
          {/* Grid Lines (Sử dụng Svg) */}
          <Svg height={CHART_HEIGHT} width={CHART_WIDTH - 50} className="absolute top-0 left-0 right-0">
            {yLabels.slice(1).map((_, index) => { // Bỏ qua nhãn 0
              const yPos = (index + 1) * (CHART_HEIGHT / (yLabels.length - 1));
              return (
                <Line
                  key={`grid-${index}`}
                  x1="0"
                  y1={CHART_HEIGHT - yPos}
                  x2={CHART_WIDTH - 50} // Phải trừ đi chiều rộng của trục Y
                  y2={CHART_HEIGHT - yPos}
                  stroke="#e0e0e0"
                  strokeWidth="1"
                  strokeDasharray="4 4"
                />
              );
            })}
            {/* Base line */}
            <Line
                x1="0"
                y1={CHART_HEIGHT}
                x2={CHART_WIDTH - 50}
                y2={CHART_HEIGHT}
                stroke="#333"
                strokeWidth="1.5"
            />
          </Svg>

          {/* Bars */}
          <View className="flex-row justify-around items-end h-full px-1 absolute inset-0">
            {chartData.map((item, index) => (
              <View key={index} className="flex-row items-end">
                {/* Income Bar */}
                <View
                  className="w-[10px] bg-[#53D68F] rounded-t-sm mr-[2px] mb-[1px]"
                  style={{
                    height: (item.income / maxChartValue) * CHART_HEIGHT,
                  }}
                />
                {/* Expenses Bar */}
                <View
                  className="w-[10px] bg-[#509EE3] rounded-t-sm mb-[1px]"
                  style={{
                    height: (item.expenses / maxChartValue) * CHART_HEIGHT,
                  }}
                />
              </View>
            ))}
          </View>
          <View className="flex-row justify-around mt-1">
                {chartData.map((item, index) => (
                <Text key={index} className="text-xs text-gray-800 font-semibold">
                    {item.day}
                </Text>
                ))}
            </View>
        </View>
      </View>
      
      {/* X-axis Labels */}
      {/* <View className="flex-row justify-around mt-1">
        {chartData.map((item, index) => (
          <Text key={index} className="text-xs text-gray-800 font-semibold">
            {item.day}
          </Text>
        ))}
      </View> */}
    </View>
  );
};

export default IncomeExpensesChart;
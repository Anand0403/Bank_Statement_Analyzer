import React, { useEffect, useState } from 'react';
import { Box, Typography, Paper, Divider } from '@mui/material';
import {
  PieChart, Pie, Cell, Tooltip,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer
} from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.6;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  return (
    <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" fontSize={12}>
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const DataDisplay = () => {
  const [pieData, setPieData] = useState([]);
  const [barData, setBarData] = useState([]);
  const [cards, setCards] = useState({ totalDeposits: 0, totalSpending: 0, highestDeposit: 0, highestSpending: 0 });
  const [topDeposits, setTopDeposits] = useState([]);
  const [topSpendings, setTopSpendings] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const username = 'user';  // <-- replace with your actual username
    const password = 'da255269-ba24-4cd4-ad0d-b315da087591';  // <-- replace with your actual password
    const basicAuth = 'Basic ' + btoa(`${username}:${password}`);

    fetch('http://localhost:8080/api/transactions', {
      headers: {
        'Authorization': basicAuth
      }
    })
      .then(res => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then(data => {
        setError(null); // clear previous errors if any
        let deposits = 0;
        let spending = 0;
        let maxDeposit = 0;
        let maxSpending = 0;

        data.forEach(t => {
          const deposit = t.depositAmount || 0;
          const withdraw = t.withdrawalAmount || 0;
          deposits += deposit;
          spending += withdraw;
          if (deposit > maxDeposit) maxDeposit = deposit;
          if (withdraw > maxSpending) maxSpending = withdraw;
        });

        setCards({
          totalDeposits: deposits,
          totalSpending: spending,
          highestDeposit: maxDeposit,
          highestSpending: maxSpending
        });

        // Pie chart data - category-wise spending
        const categoryMap = {};
        data.forEach(t => {
          if (t.category && t.withdrawalAmount) {
            categoryMap[t.category] = (categoryMap[t.category] || 0) + t.withdrawalAmount;
          }
        });
        const categoryWise = Object.entries(categoryMap).map(([name, value]) => ({ name, value }));
        setPieData(categoryWise);

        // Bar chart data - yearly expenses aggregation
        const yearMap = {};
        data.forEach(t => {
          if (t.date && t.closingBalance) {
            const date = new Date(t.date);
            const year = date.getFullYear();
            yearMap[year] = (yearMap[year] || 0) + (t.withdrawalAmount || 0);
          }
        });
        const yearly = Object.entries(yearMap)
          .map(([year, expenses]) => ({ year, expenses }))
          .sort((a, b) => a.year - b.year);
        setBarData(yearly);

        const sortedDeposits = [...data].filter(t => t.depositAmount).sort((a, b) => b.depositAmount - a.depositAmount).slice(0, 4);
        const sortedSpendings = [...data].filter(t => t.withdrawalAmount).sort((a, b) => b.withdrawalAmount - a.withdrawalAmount).slice(0, 4);

        setTopDeposits(sortedDeposits);
        setTopSpendings(sortedSpendings);
      })
      .catch(err => {
        console.error('Fetch error:', err);
        setError(err.message);
      });
  }, []);

  const infoCards = [
    { label: 'Total Deposits', value: `₹${cards.totalDeposits}`, color: '#E3F2FD', icon: '💰', flipData: topDeposits.map(t => `₹${t.depositAmount}`) },
    { label: 'Total Spending', value: `₹${cards.totalSpending}`, color: '#FFF3E0', icon: '💸', flipData: topSpendings.map(t => `₹${t.withdrawalAmount}`) },
    { label: 'Highest Deposit', value: `₹${cards.highestDeposit}`, color: '#E8F5E9', icon: '🏦', flipData: topDeposits.map(t => t.category) },
    { label: 'Highest Spending', value: `₹${cards.highestSpending}`, color: '#FCE4EC', icon: '🛍️', flipData: topSpendings.map(t => t.category) }
  ];

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" align="center" fontWeight="bold" color="primary" gutterBottom>
        Your Financial Review
      </Typography>

      {error && (
        <Typography variant="body1" color="error" align="center" sx={{ mb: 2 }}>
          Error: {error}
        </Typography>
      )}

      {/* Info Cards */}
      <Box sx={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', mb: 4 }}>
        {infoCards.map((card, index) => (
          <div key={index} style={{
            perspective: '1000px',
            width: '230px',
            height: '130px',
            margin: '10px',
          }}>
            <div style={{
              width: '100%',
              height: '100%',
              position: 'relative',
              transformStyle: 'preserve-3d',
              transition: 'transform 0.6s',
            }}
              onMouseEnter={e => e.currentTarget.style.transform = 'rotateY(180deg)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'rotateY(0deg)'}
            >
              {/* Front */}
              <Paper elevation={3} style={{
                backgroundColor: card.color,
                position: 'absolute',
                width: '100%',
                height: '100%',
                backfaceVisibility: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Typography variant="h6">{card.icon} {card.label}</Typography>
                <Typography variant="body1">{card.value}</Typography>
              </Paper>

              {/* Back */}
              <Paper elevation={3} style={{
                backgroundColor: card.color,
                position: 'absolute',
                width: '100%',
                height: '100%',
                backfaceVisibility: 'hidden',
                transform: 'rotateY(180deg)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Typography variant="h6">Top 4</Typography>
                {card.flipData.map((item, idx) => (
                  <Typography key={idx} variant="body2">{item}</Typography>
                ))}
              </Paper>
            </div>
          </div>
        ))}
      </Box>

      {/* Charts */}
      <Box sx={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap' }}>
        {/* Pie Chart */}
        <Box sx={{ width: '45%', minWidth: '300px', textAlign: 'center' }}>
          <Typography variant="h6" gutterBottom>Spending Categories</Typography>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={100}
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>

          <Divider sx={{ my: 2 }} />
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3, flexWrap: 'wrap' }}>
            {pieData.map((entry, index) => (
              <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Box sx={{
                  width: 12,
                  height: 12,
                  borderRadius: '50%',
                  backgroundColor: COLORS[index % COLORS.length]
                }} />
                <Typography variant="body2">{entry.name}</Typography>
              </Box>
            ))}
          </Box>
        </Box>

        {/* Bar Chart */}
        <Box sx={{ width: '45%', minWidth: '300px', textAlign: 'center' }}>
          <Typography variant="h6" gutterBottom>Yearly Expenses</Typography>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={barData}
              margin={{ top: 20, right: 30, left: 20, bottom: 70 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="year"
                interval={0}
                height={60}
                tick={({ x, y, payload }) => (
                  <text
                    x={x}
                    y={y + 15}
                    textAnchor="middle"
                    fill="#333"
                    fontSize={14}
                    fontWeight="bold"
                  >
                    {payload.value}
                  </text>
                )}
              />
              <YAxis />
              <Tooltip />
              <Bar dataKey="expenses" fill="#007BFF" />
            </BarChart>
          </ResponsiveContainer>
        </Box>
      </Box>
    </Box>
  );
};

export default DataDisplay;

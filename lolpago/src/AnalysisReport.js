import { Fragment, useState, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import { ResponsivePie } from '@nivo/pie';

import { summonerScore } from './services/API_Service';
import './AnalysisReport.css';
import Navbar from './Navbar';

function AnalysisReport() {
  const isPc = useMediaQuery({
    query: '(min-width:1024px)',
  });
  const isTablet = useMediaQuery({
    query: '(min-width:768px) and (max-width:1023px)',
  });
  const isMobile = useMediaQuery({
    query: '(max-width:767px)',
  });

  const device = isPc ? 'pc' : isTablet ? 'tablet' : isMobile ? 'mobile' : '';

  //   태그로 입력받은 소환사의 이름을 받아와서 P태그에 받아주기
  const summoner = sessionStorage.getItem('name');
  const champ = sessionStorage.getItem('champ');
  const games = sessionStorage.getItem('games');
  const iconIMG = sessionStorage.getItem('iconIMG');

  const [score, setScore] = useState();

  useEffect(() => {
    summonerScore(summoner).then(response => {
      setScore(response.data);
    });
  }, []);

  const reportHtml = (
    <tbody className="champ_report">
      <tr>
        <td rowSpan="2">
          <img className="champ_img" src={iconIMG} alt="champ_icon"></img>
        </td>
        <td className="champ_name">{'분석할 챔피언 : ' + champ}</td>
      </tr>
      <tr>
        <td className="champ_matchcount">{'분석할 데이터 : 최근 ' + games + ' 경기'}</td>
      </tr>
    </tbody>
  );

  const margin = { top: 30, right: 200, bottom: 30, left: 30 };

  const styles = {
    root: {
      fontFamily: 'consolas, sans-serif',
      textAlign: 'center',
      position: 'relative',
      width: 'auto',
      height: 'auto',
    },
    overlay: {
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 60,
      color: '#FFFFFF',
      // background: "#FFFFFF33",
      textAlign: 'center',
      // This is important to preserve the chart interactivity
      pointerEvents: 'none',
    },
    totalLabel: {
      fontSize: 15,
    },
  };

  const data = [
    {
      id: 'CS 개수',
      label: 'CS 개수',
      value: 120,
    },
    {
      id: '시야점수',
      label: '시야점수',
      value: 35,
    },
    {
      id: '킬 관여',
      label: '킬 관여',
      value: 33,
    },
    {
      id: '딜량',
      label: '딜량',
      value: 27,
    },
    {
      id: '타워 딜량',
      label: '타워 딜량',
      value: 199,
    },
  ];

  const theme = {
    background: '#222222',
    axis: {
      fontSize: '14px',
      tickColor: '#eee',
      ticks: {
        line: {
          stroke: '#555555',
        },
        text: {
          fill: '#ffffff',
        },
      },
      legend: {
        text: {
          fill: '#aaaaaa',
        },
      },
    },
    grid: {
      line: {
        stroke: '#555555',
      },
    },
  };

  const legends = [
    {
      anchor: 'right',
      direction: 'column',
      justify: false,
      translateX: 140,
      translateY: 0,
      itemsSpacing: 2,
      itemWidth: 100,
      itemHeight: 20,
      itemDirection: 'left-to-right',
      itemOpacity: 0.85,
      itemTextColor: '#ffffff',
      symbolSize: 20,
      effects: [
        {
          on: 'hover',
          style: {
            itemOpacity: 1,
          },
        },
      ],
    },
  ];
  const graphHtml = (
    <div style={styles.root}>
      <ResponsivePie
        margin={margin}
        data={data}
        innerRadius={0.8}
        enableRadialLabels={false}
        enableSlicesLabels={false}
        theme={theme}
        legends={legends}
      />
      <div style={styles.overlay}>
        <span>{score}</span>
        <span style={styles.totalLabel}>소환사님의 점수는</span>
      </div>
    </div>
  );

  return (
    <div className="background">
      <Navbar />
      <div className="search_elements">
        <p className={device + '_summoner_1'}>
          {summoner}님의 {champ.champ_name}
        </p>
        <p className={device + '_summoner_2'}>경기 분석 리포트</p>
      </div>
      <table className="report_table">{reportHtml}</table>
      <p className="summoner_3">AI가 소환사님의 전반적인 플레이를 평가할게요</p>
      <div>{graphHtml}</div>
    </div>
  );
}

export default AnalysisReport;

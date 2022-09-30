import { Fragment, useState, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import { useNavigate } from 'react-router-dom';

import Search from './Search';
import { searchChamp } from './services/API_Service';
import './Search.css';

function SearchSummoner() {
  const navigate = useNavigate();

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

  const [champ, setChamp] = useState([]);

  useEffect(() => {
    searchChamp(summoner).then(response => {
      setChamp(response.data);
    });
  }, [champ]);

  function analysisPage(champ, games, iconIMG) {
    sessionStorage.setItem('champ', champ);
    sessionStorage.setItem('games', games);
    sessionStorage.setItem('iconIMG', iconIMG);
    navigate(`/summoner/${summoner}/${champ}`);
  }

  const champHtml = champ.map((m, i) => (
    <tbody
      className="champ_row"
      key={i}
      onClick={() => {
        analysisPage(m.champ_name, m.match_count, m.champ_icon);
      }}
    >
      <tr>
        <td rowSpan="2">
          <img className="champ_img" src={m.champ_icon} alt="champ_icon"></img>
        </td>
        <td className="champ_name">{m.champ_name}</td>
        <td className="champ_rate" rowSpan="2">
          {'승률 : ' + m.win_rate + '%'}
        </td>
      </tr>
      <tr>
        <td className="champ_matchcount">{m.match_count + ' 경기'}</td>
      </tr>
      
    </tbody>
  ));

  return (
    <Fragment>
      <div className="search_elements">
        <Search device={device} nickname={summoner} />
      </div>
      <div className="summoner_margin"></div>
      <div className="search_elements">
        <p className={device + '_summoner_searchTitle'}>
          <span className="summoner_name">{summoner}</span>
          님의 분석할 챔피언 선택
        </p>
      </div>
      <table className="champ_table">{champHtml}</table>
    </Fragment>
  );
}

export default SearchSummoner;

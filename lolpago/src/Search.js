import React, { Fragment, useState, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import { useNavigate } from 'react-router-dom';

import SearchElement from './SearchElement';
import { searchSummoner } from './services/API_Service'; /*axios*/
import './Search.css';
import Navbar from './Navbar';


function Search(props) {
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

  const [nickname, setNickname] = useState(props.nickname);
  const [wordInput, setwordInput] = useState(false);

  const [summonerInfo, setSummonerInfo] = useState([]);

  useEffect(() => {
    if (nickname === props.nickname) {
      setwordInput(false);
    } else {
      searchSummoner(nickname).then(response => {
        setwordInput(true);
        // ["Hide on bush","CHALLENGER",1,"https://ddragon.leagueoflegends.com/cdn/12.16.1/img/profileicon/6.png"], ...
        setSummonerInfo(response.data);
      });
    }
  }, [nickname]);

  function summonerPage(name) {
    sessionStorage.setItem('name', name);
    navigate(`/summoner/${name}`);
    window.location.reload();
    setwordInput(false);
  }

  const html = summonerInfo.map((m, i) => (
    <tbody
      className="summoner_view"
      key={i}
      onClick={() => {
        summonerPage(m.name);
      }}
    >
      <tr>
        <td rowSpan="2" className="img_td">
          <img className="icon_img" src={m.profile_icon_url} alt="profile_icon"></img>
        </td>
        <td className="nickname_td">{m.name}</td>
      </tr>
      <tr>
        <td className="tier_td">{m.tier + ' ' + m.division}</td>
      </tr>
    </tbody>
  ));

  return (
    <Fragment>
      <Navbar />
      <div className="search_elements">
        <p className={device + '_search_searchTitle'}>분석할 소환사 검색하기</p>
        <SearchElement device={device} nickname={nickname} setNickname={setNickname} />
      </div>
      {wordInput && (
        <div>
          <table className="nickname_table">{html}</table>
        </div>
      )}
    </Fragment>
  );
}

export default Search;

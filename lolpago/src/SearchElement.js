import { Fragment, useEffect, useState } from 'react';
import zoom from './MagnifyingGlass.png';

// const checkInput = () => {
//   const beforeInput = searchInput.value;
//   timer(beforeInput);
// }

// const timer = (beforeInput) => {
//   setTimeout(() => {

//     if(searchInput.value === beforeInput) {
//       console.log("입력멈춤");
//       loadData(searchInput.value);		// 0.5초 내에 입력창이 변했다면 데이터 로드
//       checkInput();

//     } else {
//       console.log("입력변함");
//       checkInput();
//     }

//     if(searchInput.value === "") {		// 입력창이 비었다면 추천 검색어 리스트 숨김
//       relContainer.classList.add("hide");
//     } else {
//       relContainer.classList.remove("hide");
//     }
//   }, 500);
// }

function SearchElement(props) {
  function nameInput(e) {
    props.setNickname(e.target.value);
  }

  // const updateChange = (e) => {
  //   let data = e.target.value;
  //   let filterData = mydata.filter((i) =>
  //     i.name.toLowerCase().includes(data.toLowerCase())
  //   );
  //   if (data.length === 0) {
  //     filterData = [];
  //   }
  //   setSearch(filterData);
  // };

  function clickBtn() {
    props.setBtnClick(true);
  }

  return (
    <Fragment>
      <table className={props.device + '_search_div'}>
        <tbody>
          <tr>
            <td>
              <input
                type="search"
                className={props.device + '_search_guideline'}
                placeholder={props.nickname ? props.nickname : '소환사명을 검색해주세요.'}
                maxLength="20"
                size="30"
                onChange={nameInput}
              ></input>
            </td>
            <td>
              <img className="zoom_icon" src={zoom} alt="검색" onClick={clickBtn}></img>
            </td>
          </tr>
        </tbody>
      </table>
    </Fragment>
  );
}

export default SearchElement;

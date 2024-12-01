// import { React, useEffect, useState } from "react";

// const MyPage = ({ user }) => {
//   const(results,setResults) = useState([])
//   const fetchMyPage = async () => {
//     const data = await getTestResults();
//     const filteredData = data.filter((item) => item.vi || item.userID ===user.id)
//     setResults(filteredData)
//   };

//   useEffect () => {
//     fetchMyPage


//   }, [] );
//   return (
//   <div>
  
//   <div>MyPage</div>
//   {results.map((result) => {

// return (
//   <div>
//     <h2>{result.nickname}님의 결과</h2>
//     <p>MBTI 유형: {result.result}</p>
//     {isOwner && (
//       <>
//         <button onClick={handleToggleVisibility}>
//           {result.visibility ? '비공개로 전환' : '공개로 전환'}
//         </button>
//         <button onClick={handleDelete}>삭제</button>
//       </>
//     )}
//   </div>
// );
// };

// </>
//   }
// </div>
// };

// export default MyPage;

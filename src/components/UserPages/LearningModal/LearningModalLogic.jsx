// import "../../../assets/Global.scss";

// import classes from "./LearningModal.module.scss";
// import classNames from "classnames/bind";

// import { useRef, useEffect } from "react";

// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import LearningModalContent from "./LearningModalContent/LearningModalStatusBar";
// import { faSquare, faX } from "@fortawesome/free-solid-svg-icons";

// function LearningModalLogic({ learningModalIsVisible, hideLearningModal }) {
//   const cx = classNames.bind(classes);

//   const learningRef = useRef();
//   const contentLearningRef = useRef();

//   useEffect(() => {
//     if (learningModalIsVisible) {
//       setTimeout(() => {
//         learningRef.current.style.opacity = 0.8;

//         contentLearningRef.current.style.opacity = 1;
//         contentLearningRef.current.style.transform = `translateY(${0}rem) perspective(${75}rem) rotateX(${0}deg)`;
//       });
//     }
//   }, [learningModalIsVisible]);

//   const exitPopupAnimation = () => {
//     learningRef.current.style.opacity = 0;

//     contentLearningRef.current.style.opacity = 0;
//     contentLearningRef.current.style.transform = `translateY(${-2}rem) perspective(${75}rem) rotateX(${10}deg)`;

//     setTimeout(() => {
//       hideLearningModal();
//     }, 200);
//   };

//   return (
//     <>
//       <div
//         onClick={exitPopupAnimation}
//         ref={learningRef}
//         className={classNames(cx("learning"))}
//       ></div>
//       <div className={classNames(cx("learning-container"))}>
//         <div
//           ref={contentLearningRef}
//           className={classNames(cx("learning-content"))}
//         >
//           <div className={classNames(cx("learning-content-header"))}>
//             <span>1/20 Round 1</span>
//             <div className={classNames(cx("techcards-main-progress-bar-list"))}>
//               <div
//                 style={{
//                   width: `${actualStatus[0] * 100}%`,
//                 }}
//                 className={classNames(
//                   cx("techcards-main-progress-bar-list-new")
//                 )}
//               >
//                 <span>New techcards:{actualStatus[0]}</span>
//               </div>
//               <div
//                 style={{
//                   width: `${actualStatus[1] * 100}%`,
//                 }}
//                 className={classNames(
//                   cx("techcards-main-progress-bar-list-learned")
//                 )}
//               >
//                 <span>
//                   Learned techcards:
//                   {actualStatus[1]}
//                 </span>
//               </div>
//               <div
//                 style={{
//                   width: `${actualStatus[2] * 100}%`,
//                 }}
//                 className={classNames(
//                   cx("techcards-main-progress-bar-list-to-learn")
//                 )}
//               >
//                 <span>
//                   To learn techcards:
//                   {actualStatus[2]}
//                 </span>
//               </div>
//               <div
//                 style={{
//                   width: `${actualStatus[3] * 100}%`,
//                 }}
//                 className={classNames(
//                   cx("techcards-main-progress-bar-list-hard")
//                 )}
//               >
//                 <span>Hard techcards:{actualStatus[3]}</span>
//               </div>
//             </div>
//             <FontAwesomeIcon
//               onClick={exitPopupAnimation}
//               className={classNames(cx("learning-content-header-icon"))}
//               icon={faX}
//             />
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default LearningModalLogic;

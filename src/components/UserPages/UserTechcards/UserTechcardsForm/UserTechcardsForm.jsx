import "../../../assets/Global.scss";

import classes from "./Newsletter.module.scss";
import classNames from "classnames/bind";

function Newsletter(props) {
  const cx = classNames.bind(classes);

  const addFormRadio = useRef();
  const changeFormRadio = useRef();
  const deleteFormRadio = useRef();

  return (
    <form onSubmit={props.techcardsSubmitHandler}>
      {props.children}

      {changeTechcardsIsVisible ? (
        <>
          {props.addFormIsSelected ? (
            <input type="text" placeholder="New folder" />
          ) : (
            ""
          )}

          <div>
            <label htmlFor="add">Add</label>
            <input
              ref={props.addFormRadio}
              type="radio"
              name="formType"
              id="add"
              checked={props.addFormIsSelected}
              onClick={() => {
                props.clearFormStates();
                props.setAddFormIsSelected(true);
              }}
            />
            <label htmlFor="change">Change</label>
            <input
              ref={props.changeFormRadio}
              type="radio"
              name="formType"
              id="change"
              checked={props.changeFormIsSelected}
              onClick={() => {
                props.clearFormStates();
                props.setChangeFormIsSelected(true);
              }}
            />
            <label htmlFor="delete">Delete</label>
            <input
              ref={props.deleteFormRadio}
              type="radio"
              name="formType"
              id="delete"
              checked={props.deleteFormIsSelected}
              onClick={() => {
                props.clearFormStates();
                props.setDeleteFormIsSelected(true);
              }}
            />
          </div>
          <button className="btn-solid-small">Confirm</button>
        </>
      ) : (
        ""
      )}
    </form>
  );
}

export default Newsletter;
// const uniqLists = [...new Set(techcardsLists)];
// const counts =
//   techcards &&
//   techcardsFolders.reduce(
//     (acc, value) => ({
//       ...acc,
//       [value]: (acc[value] || 0) + 1,
//     }),
//     {}
//   );

// uniqLists.forEach((list, i) => {
//   let listArr = [];
//   techcards.forEach((arr, i) => {
//     return arr.list === list ? listArr.push(arr.new) : "";
//   });
// });

{
  uniqFolders.map((folder, iFolder) => {
    return (
      <div key={folder} className={classNames(cx("techcards-main"))}>
        <h2>{folder}</h2>
        <div className={classNames(cx("techcards-main-progress-bar"))}>
          <div className={classNames(cx("techcards-main-progress-bar-new"))}>
            {countFolderNew[iFolder]}
          </div>
          <div
            className={classNames(cx("techcards-main-progress-bar-learned"))}
          >
            {countFolderLearned[iFolder]}
          </div>
          <div
            className={classNames(cx("techcards-main-progress-bar-to-learn"))}
          >
            {countFolderToLearn[iFolder]}
          </div>
          <div className={classNames(cx("techcards-main-progress-bar-hard"))}>
            {countFolderHard[iFolder]}
          </div>
        </div>
        <ul>
          {techcards.map((arr, i) => {
            const techcardsCount = arr.first_side.split("/").length;

            if (arr.folder === folder)
              return (
                <li key={i}>
                  {changeFormIsSelected ? (
                    <input type="text" value={arr.list} />
                  ) : (
                    <Link to={`${arr.folder}/${arr.list}`}>{arr.list}</Link>
                  )}

                  <div
                    className={classNames(cx("techcards-main-list-container"))}
                  >
                    <p>{techcardsCount}</p>
                    <div
                      style={{ width: `${arr.new * 100}%` }}
                      className={classNames(
                        cx("techcards-main-progress-bar-list")
                      )}
                    >
                      <div
                        style={{ width: `${arr.new * 100}%` }}
                        className={classNames(
                          cx("techcards-main-progress-bar-list-new")
                        )}
                      >
                        <span>New techcards:{arr.new}</span>
                      </div>
                      <div
                        style={{ width: `${arr.learned * 100}%` }}
                        className={classNames(
                          cx("techcards-main-progress-bar-list-learned")
                        )}
                      >
                        <span>Learned techcards:{arr.learned}</span>
                      </div>
                      <div
                        style={{ width: `${arr.to_learn * 100}%` }}
                        className={classNames(
                          cx("techcards-main-progress-bar-list-to-learn")
                        )}
                      >
                        <span>To learn techcards:{arr.to_learn}</span>
                      </div>
                      <div
                        style={{ width: `${arr.hard * 100}%` }}
                        className={classNames(
                          cx("techcards-main-progress-bar-list-hard")
                        )}
                      >
                        <span>Hard techcards:{arr.hard}</span>
                      </div>
                    </div>
                    {deleteFormIsSelected ? (
                      <input
                        type="checkbox"
                        value={`${arr.folder}/${arr.list}`}
                      />
                    ) : (
                      ""
                    )}
                  </div>
                </li>
              );
          })}
          {addFormIsSelected ? (
            <li style={{ border: "none", marginTop: "0.8rem" }}>
              <input type="text" placeholder="New list" />
            </li>
          ) : (
            ""
          )}
        </ul>
      </div>
    );
  });
}

{
  changeTechcardsIsVisible ? (
    <>
      {addFormIsSelected ? <input type="text" placeholder="New folder" /> : ""}

      <div>
        <label htmlFor="add">Add</label>
        <input
          ref={addFormRadio}
          type="radio"
          name="formType"
          id="add"
          checked={addFormIsSelected}
          onClick={() => {
            clearFormStates();
            setAddFormIsSelected(true);
          }}
        />
        <label htmlFor="change">Change</label>
        <input
          ref={changeFormRadio}
          type="radio"
          name="formType"
          id="change"
          checked={changeFormIsSelected}
          onClick={() => {
            clearFormStates();
            setChangeFormIsSelected(true);
          }}
        />
        <label htmlFor="delete">Delete</label>
        <input
          ref={deleteFormRadio}
          type="radio"
          name="formType"
          id="delete"
          checked={deleteFormIsSelected}
          onClick={() => {
            clearFormStates();
            setDeleteFormIsSelected(true);
          }}
        />
      </div>
      <button className="btn-solid-small">Confirm</button>
    </>
  ) : (
    ""
  );
}

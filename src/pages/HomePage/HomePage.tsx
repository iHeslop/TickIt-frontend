import NewToDoLoader from "../../containers/NewToDoLoader/NewToDoLoader";
import ToDoGridLoader from "../../containers/ToDoGridLoader/ToDoGridLoader";
import styles from "./HomePage.module.scss";
import bg from "../../assets/monochrome.png";

const HomePage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <NewToDoLoader />
        <ToDoGridLoader />
      </div>
      <img src={bg} alt="background" className={styles.bg} />
      <p className={styles.copyright}>&copy; / 2024</p>
    </div>
  );
};
export default HomePage;

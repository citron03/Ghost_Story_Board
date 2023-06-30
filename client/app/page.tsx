import PostForm from "@/components/PostForm";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <div>
        <h1 className={styles.title}>괴담 괴시판 👻</h1>
      </div>
      <div>
        <h2 className={styles.subTitle}>괴담 작성</h2>
        <PostForm />
      </div>
    </main>
  );
}

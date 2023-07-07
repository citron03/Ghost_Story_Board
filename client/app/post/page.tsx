import PostForm from "@/components/PostForm";
import styles from "./page.module.css";

export default function Page() {
  return (
    <div>
      <h2 className={styles.subTitle}>괴담 작성</h2>
      <PostForm />
    </div>
  );
}

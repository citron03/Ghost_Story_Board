import { Tag } from "@chakra-ui/react";
import type { Tag as TagType } from "@/types/postType";
import styles from "./TagCard.module.css";

export default function TagCard({ name = "" }: Partial<TagType>) {
  return (
    <Tag
      size="sm"
      variant="solid"
      colorScheme="teal"
      onClick={() => alert(`${name} 태그 클릭!`)}
      className={styles.container}
    >
      {name}
    </Tag>
  );
}

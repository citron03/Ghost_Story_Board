import { Tag } from "@chakra-ui/react";
import type { Tag as TagType } from "@/types/postType";

export default function TagCard({ name }: Partial<TagType>) {
  return (
    <Tag
      size="sm"
      variant="solid"
      colorScheme="teal"
      onClick={() => alert(`${name} 태그 클릭!`)}
    >
      {name}
    </Tag>
  );
}

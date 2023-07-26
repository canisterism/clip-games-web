import Image from "next/image";
type Props = {
  imageUrl: string | undefined;
  title: string;
};

export default function GameImage({ imageUrl, title }: Props) {
  return (
    <div className="aspect-h-4 aspect-w-3 overflow-hidden rounded-lg bg-gray-200 ">
      <Image
        src={imageUrl ? `${imageUrl}` : "https://placeimg.com/320/400/any"}
        alt={`${title}`}
        className="h-full w-full object-cover object-center"
        layout="fill"
        objectFit="cover"
      />
    </div>
  );
}

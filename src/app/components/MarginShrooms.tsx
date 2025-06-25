import Image from "next/image";

export default function MarginShrooms() {
  return (
    <>
      <Image
        src="/logos/lilshrooms.svg"
        alt="Shroom left"
        className="margin-shroom left-shroom"
        width={50}
        height={50}
      />
      <Image
        src="/logos/lilshrooms.svg"
        alt="Shroom right"
        className="margin-shroom right-shroom"
        width={50}
        height={50}
      />
    </>
  );
}

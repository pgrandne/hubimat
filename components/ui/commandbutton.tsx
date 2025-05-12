import * as React from "react";
import { createImage } from "@/lib/utils";
import Image from "next/image";

export const CommandButton = ({
  onClickCommand,
  imageFileBytes,
  label,
  keyId,
}: {
  onClickCommand: any;
  imageFileBytes: string;
  label: string;
  keyId: number;
}) => {
  return (
    <div>
      <div
        key={keyId}
        className="flex flex-col items-center mr-6"
        onClick={() => onClickCommand}
      >
        <Image
          src={createImage(imageFileBytes)}
          alt="image control"
          width={20}
          height={20}
        />
        <span>{label}</span>
      </div>
    </div>
  );
};

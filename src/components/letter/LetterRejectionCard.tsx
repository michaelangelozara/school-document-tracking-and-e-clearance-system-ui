import React from "react";
import { StatusOfBaseLetter } from "../../types/letter/BaseLetter";

type LetterRejectionCardPropsType = {
  status: StatusOfBaseLetter | undefined;
  reasonOfRejection: string;
};
const LetterRejectionCard = ({
  status,
  reasonOfRejection,
}: LetterRejectionCardPropsType) => {
  if (status !== StatusOfBaseLetter.REJECTED) {
    return null;
  }

  return (
    <div className="bg-white rounded-md p-2 ">
      <span className="font-semibold text-red-500 text-sm md:text-md">
        REASON OF REJECTION :
      </span>
      <p className="border border-gray-200 p-2 rounded-md text-xs md:text-sm">
        Contrary to popular belief, Lorem Ipsum is not simply random text. It
        has roots in a piece of classical Latin literature from 45 BC, making it
        over 2000 years old. Richard McClintock, a Latin professor at
        Hampden-Sydney College in Virginia, looked up one of the more obscure
        Latin words, consectetur, from a Lorem Ipsum passage, and going through
        the cites of the word in classical literature, discovered the
        undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33
        of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by
        Cicero, written in 45 BC. This book is a treatise on the theory of
        ethics, very popular during the Renaissance. The first line of Lorem
        Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section
        1.10.32. The standard chunk of Lorem Ipsum used since the 1500s is
        reproduced below for those interested. Sections 1.10.32 and 1.10.33 from
        "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their
        exact original form, accompanied by English versions from the 1914
        translation by H. Rackham.
      </p>
    </div>
  );
};

export default LetterRejectionCard;

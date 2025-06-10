import React, { useState } from "react";
import Cropper, { Area, Point } from "react-easy-crop";
import { getCroppedImg } from "../../helper/cropImage";
import Slider from "@mui/material/Slider";

type ImageCropperPropsType = {
  imageSrc: string;
  save: (croptedBlob: Blob) => void;
  cancel: () => void;
};
const ImageCropper = ({ imageSrc, save, cancel }: ImageCropperPropsType) => {
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

  const onCropComplete = (_: Area, croppedPixels: Area) => {
    setCroppedAreaPixels(croppedPixels);
  };

  const showCroppedImage = async () => {
    if (!croppedAreaPixels) return;
    try {
      const croppedBlob = await getCroppedImg(imageSrc, croppedAreaPixels);
      console.log("This is the cropted image");
      save(croppedBlob); // save image
      cancel();
    } catch (e) {
      console.error("Failed to crop image", e);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/30 flex flex-col items-center z-50">
      <div className="relative w-[90%] h-[300px] mb-4">
        <Cropper
          image={imageSrc}
          crop={crop}
          zoom={zoom}
          aspect={1 / 1}
          onCropChange={setCrop}
          onCropComplete={onCropComplete}
          onZoomChange={setZoom}
        />
      </div>
      <div className="w-[90%]">
        <Slider
          value={zoom}
          min={1}
          max={3}
          step={0.1}
          aria-labelledby="Zoom"
          onChange={(e, zoom) => setZoom(Number(zoom))}
          classes={{ root: "slider" }}
        />
        <div className="flex gap-4">
          <button
            className="pl-4 pr-4 p-1 bg-darkContrast text-white text-lg rounded-md"
            onClick={cancel}
          >
            Cancel
          </button>
          <button
            className="pl-4 pr-4 p-1 bg-darkContrast text-white text-lg rounded-md"
            onClick={showCroppedImage}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageCropper;

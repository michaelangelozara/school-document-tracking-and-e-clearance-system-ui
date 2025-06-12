import { useEffect, useRef, useState } from "react";
import CAMERA_ICON from "../assets/icon/svg/profile/camera-svgrepo-com.svg";
import PROFILE_ICON from "../assets/icon/svg/profile/user-circle-svgrepo-com.svg";
import ImageCropper from "../components/shared/ImageCropper";
import EDIT_ICON from "../assets/icon/svg/profile/edit-svgrepo.svg";
import { getErrorMessage } from "../helper/AxiosHelper";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/Store";
import { open } from "../store/slice/MessageSlice";
import { meDetailed } from "../service/UserService";
import { useAuth } from "../context/AuthContext";
import {
  IAcademicPersonnelResponse,
  INonAcademicPersonnelResponse,
  IStudentResponse,
} from "../types/user/User";
import { extractFullName } from "../helper/UserHelper";
import AcademicInfo from "../components/infrastructure/factory/profile/AcademicInfo";

const Profile = () => {
  const [isImageCropperOpen, setIsImageCropperOpen] = useState<boolean>(false);
  const [imageSrc, setImageSrc] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [croppedImage, setCroppedImage] = useState<string | null>(null);
  const [userData, setUserData] = useState<
    | IStudentResponse
    | IAcademicPersonnelResponse
    | INonAcademicPersonnelResponse
    | null
  >(null);

  const dispatch = useDispatch<AppDispatch>();
  const handleIconClick = () => {
    fileInputRef.current?.click();
  };

  const closeImageCropper = () => {
    setIsImageCropperOpen(false);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const imageDataUrl = reader.result as string;
      setImageSrc(imageDataUrl); // Store this in state to pass to ImageCropper
      setIsImageCropperOpen(true);
    };
    reader.readAsDataURL(file);
  };

  const { apiClient, user } = useAuth();

  const saveImage = async (croptedBlob: Blob) => {
    const croppedUrl = URL.createObjectURL(croptedBlob);

    // save profile to database
    try {
      // const formData = new FormData();
      // formData.append("profile", croptedBlob);
      // const response = await uploadProfilePicture(apiClient, formData);
      // console.log(response);

      setCroppedImage(croppedUrl); // view the uploaded picture
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await meDetailed(apiClient);
        setUserData(response);
      } catch (error: any) {
        if (error.status === 404) {
          const errorMessage = getErrorMessage(error);
          dispatch(open(errorMessage));
        }
      }
    };

    fetchData();
  }, []);
  console.log(userData);
  return (
    <div className="bg-background p-3 flex flex-col gap-2 text-darkContrast">
      <div className="bg-white flex flex-col gap-5 justify-center items-center text-center pb-3 rounded-md shadow">
        <div className="relative">
          <img
            src={croppedImage || PROFILE_ICON}
            className="size-24 aspect-square col-span-2 col-start-2 rounded-full border-2 border-darkContrast"
            alt="Profile Picture"
          />
          <img
            src={CAMERA_ICON}
            className="size-5 col-start-3 absolute left-[88px] top-[90px] cursor-pointer"
            alt="Edit Icon"
            onClick={handleIconClick}
          />
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            className="hidden"
            onChange={handleFileChange}
          />
        </div>
        <div>
          <h1 className="font-bold md:text-md">
            {extractFullName({
              firstName: userData?.firstname,
              middleName: userData?.middle_name,
              lastName: userData?.lastname,
            })}
          </h1>
          <h1 className="text-black/40 md:text-md">{userData?.username}</h1>
        </div>
      </div>

      <div className="bg-white rounded-md p-2 flex flex-col gap-2 shadow">
        <h1 className="font-bold border-b border-gray-200 md:text-md">
          Personal Info
        </h1>
        <div className="grid grid-rows-7 grid-cols-2 gap-2">
          <h1 className="text-black">First Name</h1>
          <h1>{userData?.firstname}</h1>

          <h1 className="text-black">Middle Name</h1>
          <h1>{userData?.middle_name}</h1>

          <h1 className="text-black">Last Name</h1>
          <h1>{userData?.lastname}</h1>

          <h1 className="text-black">Type</h1>
          <h1>{userData?.type}</h1>

          <h1 className="text-black">Gender</h1>
          <h1>{userData?.gender}</h1>

          <h1 className="text-black">User ID</h1>
          <h1>{userData?.username}</h1>

          <h1 className="text-black">
            {userData?.authorities !== undefined &&
            userData?.authorities.length > 1
              ? "Authorities"
              : "Authority"}
          </h1>
          <ul>
            {userData?.authorities?.map((element, index) => (
              <li key={index}>{element}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="bg-white rounded-md p-2 flex flex-col gap-2 shadow">
        <h1 className="font-bold border-b border-gray-200 md:text-md">
          Contact Info
        </h1>
        <div className="grid grid-rows-2 grid-cols-[1fr_1fr_20px] gap-4 items-center">
          <h1 className="text-black text-nowrap">Contact Number</h1>
          <h1>{userData?.contact_number}</h1>
          <img src={EDIT_ICON} className="size-5" alt="Edit contact" />

          <h1 className="text-black text-nowrap">Email</h1>
          <h1 className="w-[150px] break-words">{userData?.email}</h1>
          <img src={EDIT_ICON} className="size-5" alt="Edit email" />
        </div>
      </div>

      {/* Academic info */}
      <AcademicInfo type={user?.type} data={userData} />

      <div className="bg-white rounded-md p-2 flex flex-col gap-2 shadow">
        <h1 className="font-bold border-b border-gray-200 md:text-md">
          Timestamp
        </h1>
        <div className="grid grid-rows-2 grid-cols-2 gap-2">
          <h1 className="text-black">Created</h1>
          <h1>{userData?.created_at}</h1>

          <h1 className="text-black">Last Modified</h1>
          <h1>{userData?.last_modified_at}</h1>
        </div>
      </div>

      <div className="bg-white rounded-md p-2 flex flex-col gap-2 shadow">
        <h1 className="font-bold border-b border-gray-200 md:text-md">
          Privacy
        </h1>
        <div className="grid grid-rows-2 grid-cols-2 gap-2">
          <h1 className="text-black">E-Signature</h1>
          <h1 className="text-darkContrast underline cursor-pointer">Upload</h1>

          <h1 className="text-black">Password</h1>
          <h1 className="text-darkContrast underline cursor-pointer">
            Change Password
          </h1>
        </div>
      </div>

      {isImageCropperOpen && (
        <ImageCropper
          imageSrc={imageSrc}
          save={saveImage}
          cancel={closeImageCropper}
        />
      )}
    </div>
  );
};

export default Profile;

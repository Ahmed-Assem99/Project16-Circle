import { useRef, useState } from "react";

import { Avatar, Button, form, Textarea } from "@heroui/react";

import { FaImage, FaTimes } from "react-icons/fa";

import postsService from "../services/postsService";

export default function CreatePost({getAllPosts}:{getAllPosts:any}) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [Caption, setCaption] = useState("");
  const [ImgPreview, setImgPreview] = useState<string|null>("");
  const [imgFile, setImgFile] = useState<any>()
  const [isLoading, setisLoading] = useState(false)

  function handleImageChange(e: any) {
    const imgFile = e.target.files?.[0];
    if (!imgFile) return;
    setImgFile(imgFile)

    const reader = new FileReader();
    reader.onload = function () {
      setImgPreview(reader.result as string);
    };

    reader.readAsDataURL(imgFile);
  }

  function removeImage() {
    setImgPreview(null);
    setImgFile(null)
  }


async function createPost(e:any){
e.preventDefault()
setisLoading(true)

const formData= new FormData;
if(Caption){
  formData.set("body",Caption)}
if(imgFile){
formData.set("image",imgFile)}

const response=await postsService.createPost(formData)

removeImage()
setCaption("")
setisLoading(false)
getAllPosts()
}



  return (
    <form onSubmit={createPost}>
    <div className="mb-5 overflow-hidden rounded-2xl border border-default-200 bg-white p-4 shadow-sm dark:bg-default-50">
      {/* Top section */}

      <div className="flex items-start gap-3">
        <Avatar name="You" size="md" className="shrink-0" />

        <Textarea
          value={Caption}
          onChange={(e) => setCaption(e.target.value)}
          placeholder="What's on your mind?"
          minRows={2}
          maxRows={6}
          variant="flat"
          className="flex-1"
          classNames={{
            input: "text-sm",

            inputWrapper: "bg-default-100 hover:bg-default-200",
          }}
        />
      </div>

      {ImgPreview && (
        <div className="relative mt-4 overflow-hidden rounded-xl border border-default-200">
          <img
            src={ImgPreview}
            alt="Post preview"
            className="max-h-[400px] w-full object-cover"
          />

          <Button
            isIconOnly
            size="sm"
            radius="full"
            variant="solid"
            color="default"
            className="absolute right-3 top-3"
            onPress={removeImage}
            aria-label="Remove image"
          >
            <FaTimes />
          </Button>
        </div>
      )}

      {/* Bottom actions */}

      <div className="mt-4 flex items-center justify-between border-t border-default-200 pt-3">
        <div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            id="fileInput"
            className="hidden"
          />

          <Button
            variant="light"
            color="success"
            startContent={<FaImage />}
            onPress={() => fileInputRef.current?.click()}
          >
            Photo
          </Button>
        </div>

        <Button
          color="primary"
          radius="full"
        type="submit"
        isDisabled={Caption.trim() =="" && imgFile==undefined}
        isLoading={isLoading}
        >
{isLoading? <span>Posting...</span>: <span>Post</span>}
        </Button>
      </div>
    </div>
    </form>
  );
}

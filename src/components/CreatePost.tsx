import { useRef, useState } from "react";

import { Avatar, Button, Textarea } from "@heroui/react";

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

await postsService.createPost(formData)

removeImage()
setCaption("")
setisLoading(false)
getAllPosts()
}



  /* STYLING NOTES — CreatePost card
     - Uses the shared `card` utility, so it matches the Post cards exactly
       (the old `bg-white dark:bg-default-50` pair isn't needed because
       `bg-content1` already switches for dark mode).
     - Removed `mb-5`: the Feed's `gap-4` now spaces it from the posts.
     - Layout: [avatar | textarea] on top, then a divider line, then
       [Photo button ........ Post button] pushed apart with justify-between. */
  return (
    <form onSubmit={createPost}>
    <div className="card p-4">
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
          // classNames lets us style the INNER parts of a HeroUI component:
          //  input        → the actual <textarea> text
          //  inputWrapper → the grey box around it (rounded-xl to match our radius scale)
          classNames={{
            input: "text-sm",

            inputWrapper: "rounded-xl bg-default-100 hover:bg-default-200",
          }}
        />
      </div>

      {ImgPreview && (
        // relative → lets the "remove" button be positioned on top of the image
        <div className="relative mt-4 overflow-hidden rounded-xl border border-divider">
          <img
            src={ImgPreview}
            alt="Post preview"
            className="max-h-100 w-full object-cover"
          />

          {/* absolute right-3 top-3 → pinned to the image's top-right corner
              bg-black/60 text-white → dark see-through circle, readable on any photo
              backdrop-blur-sm → slightly blurs the photo behind the button */}
          <Button
            isIconOnly
            size="sm"
            radius="full"
            variant="solid"
            color="default"
            className="absolute right-3 top-3 bg-black/60 text-white backdrop-blur-sm"
            onPress={removeImage}
            aria-label="Remove image"
          >
            <FaTimes />
          </Button>
        </div>
      )}

      {/* Bottom actions */}

      {/* border-t + pt-3 → a divider line with space under it
          justify-between → Photo on the left, Post on the right */}
      <div className="mt-4 flex items-center justify-between border-t border-divider pt-3">
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

        {/* The main action: brand color, pill shape, a bit wider (px-6) and bolder */}
        <Button
          color="primary"
          radius="full"
          className="px-6 font-semibold"
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

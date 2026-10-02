import { useRef, useState } from "react";

import { Avatar, Button, Textarea } from "@heroui/react";

import { FaImage, FaTimes } from "react-icons/fa";

import postsService from "../services/postsService";



export default function CreatePost() {
    const fileInputRef = useRef<HTMLInputElement>(null);
  return (
    <div className="mb-5 overflow-hidden rounded-2xl border border-default-200 bg-white p-4 shadow-sm dark:bg-default-50">
      {/* Top section */}

      <div className="flex items-start gap-3">
        <Avatar name="You" size="md" className="shrink-0" />

        <Textarea
          // value={body}

          // onValueChange={setBody}

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

      {/* Image preview

      {preview && (

      <div className="relative mt-4 overflow-hidden rounded-xl border border-default-200">
        <img
          // src={preview}

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
          // onPress={removeImage}

          aria-label="Remove image"
        >
          <FaTimes />
        </Button>
      </div>

      )} */}

      {/* Bottom actions */}

      <div className="mt-4 flex items-center justify-between border-t border-default-200 pt-3">
        <div>
          <input
            ref={fileInputRef}

            type="file"
            accept="image/*"
            // onChange={handleImageChange}
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

          // isLoading={isLoading}

          // isDisabled={!body.trim() && !image}

          // onPress={handleSubmit}
        >
          Post
        </Button>
      </div>
    </div>
  );
}

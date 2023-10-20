"use client";

import autoAnimate from "@formkit/auto-animate";
import { Button, Code, Input } from "@nextui-org/react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { BiLink } from "react-icons/bi";
import { FaWandMagicSparkles } from "react-icons/fa6";
import { HiClipboardCopy } from "react-icons/hi";
import { toast } from "sonner";

const LinkInput = () => {
  const [link, setLink] = useState("");
  const [valid, setValid] = useState(false);

  const parent = useRef(null);

  useEffect(() => {
    parent.current && autoAnimate(parent.current);
  }, [parent]);

  const regex = /^https:\/\/\S+\.\S+/;

  const testRegex = (str: string) => {
    if (regex.test(str)) {
      setValid(true);
    } else {
      setValid(false);
    }
  };

  const {
    mutate: handleShorten,
    isPending,
    data,
  } = useMutation({
    mutationFn: async (link: string) => {
      const { data } = await axios.post("/api/generate", { link });
      return data;
    },
    onSuccess: (data) => {
      toast.success("Successfully minified link!");
    },
    onError: (err) => {
      toast.error("Something went wrong!");
    },
  });

  return (
    <>
      <div ref={parent} className="mt-8 md:mt-10">
        <Input
          value={link}
          onChange={(e) => {
            testRegex(e.target.value);
            setLink(e.target.value);
          }}
          placeholder="https://hooli.io"
          className=" w-[80vw] md:w-[35vw] placeholder:text-gray-50"
          variant="bordered"
          startContent={<BiLink className="h-6 w-6" />}
        />
        {!valid && link.length > 0 && (
          <p className="text-red-500 text-xs mt-1">
            {"Please make sure the link is valid and starts with https://"}
          </p>
        )}
        {data && (
          <div className="flex flex-col items-center mt-10 gap-4">
            <h2 className="font-medium">Your minified link</h2>
            <div className="flex items-center gap-2">
              <Code className="font-semibold" color="success">
                {data?.link}
              </Code>
              <div
                onClick={() => {
                  navigator.clipboard.writeText(data?.link);
                  toast.success("Copied to clipboard!");
                }}
                className="p-1 rounded-md bg-black cursor-pointer"
              >
                <HiClipboardCopy className="h-4 w-4 text-white" />
              </div>
            </div>
          </div>
        )}
      </div>
      <Button
        variant="shadow"
        size="md"
        color="primary"
        isDisabled={!valid}
        startContent={
          !isPending && <FaWandMagicSparkles className="text-white" />
        }
        className="mt-10"
        onClick={() => {
          handleShorten(link);
        }}
        isLoading={isPending}
      >
        Minify
      </Button>
    </>
  );
};

export default LinkInput;

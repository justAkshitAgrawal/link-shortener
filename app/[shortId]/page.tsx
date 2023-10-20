import { redisClient } from "@/utils/redis";
import { notFound, redirect } from "next/navigation";
import React from "react";

const ReroutePage = async ({ params }: { params: { shortId: string } }) => {
  const res = await redisClient.get(params.shortId);

  if (!res) {
    return notFound();
  }

  if (res) {
    redirect(res);
  }

  return <></>;
};

export default ReroutePage;

"use client";
import { BASE_URL } from "@/constant/constant";
import axios from "axios";
import { useSession } from "next-auth/react";

const SaveFaq = ({ refetch, setIsOpen, faqData }) => {
  const { data: user } = useSession();
  const handleFaq = async (e) => {
    e.preventDefault();
    const form = e.target;
    const question = form.question.value;
    const answer = form.answer.value;
    const url = `${BASE_URL}/admin/faq/${user?.user?._id}/${user?.user?.email}/${user?.user?.wallet}/faq`;
    const faq = {
      question,
      answer,
    };
    const mainData = [faq, ...faqData];
    const { data } = await axios.post(url, mainData);
    if (data?.status) {
      setIsOpen(false);
      refetch();
    }
  };

  return (
    <form onSubmit={handleFaq} className="grid gap-4 bg-black my-5">
      <div>
        <h3 className="text-white font-semibold mb-1">Question</h3>
        <input
          type="text"
          placeholder="question"
          className="input input-bordered w-full text-black bg-white"
          name="question"
          required
        />
      </div>
      <div>
        <h3 className="text-white font-semibold mb-1">Answer</h3>
        <input
          type="text"
          placeholder="Answer"
          className="input input-bordered w-full text-black bg-white"
          name="answer"
          required
        />
      </div>
{/*  */}
      <button
        type="submit"
        className="btn-outline btn text-md font-semibold h-10 w-28  rounded-lg text-white"
      >
        Create
      </button>
    </form>
  );
};

export default SaveFaq;

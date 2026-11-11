"use client";

import { HomeAcademics } from "./HomeAcademics";
import { HomeEnquiry } from "./HomeEnquiry";

type FormState = {
  studentName: string;
  parentName: string;
  mobile: string;
  className: string;
  stream: string;
  address: string;
  message: string;
};

type Props = {
  locale: "en" | "hi";
  form: FormState;
  setForm: React.Dispatch<React.SetStateAction<FormState>>;
  submitting: boolean;
  submitted: boolean;
  errorMsg: string;
  handleEnquirySubmit: (e: React.FormEvent) => void;
};

export function HomeBottom(props: Props) {
  return (
    <>
      <HomeAcademics locale={props.locale} />
      <HomeEnquiry {...props} />
    </>
  );
}

import * as Yup from "yup";
export const validationSchema = Yup.object().shape({
  contact: Yup.string().required("전화번호를 입력해 주세요"),
  siteName: Yup.string().required("사이트 이름을 입력해 주세요"),
});

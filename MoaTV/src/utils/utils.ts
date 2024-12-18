/* eslint-disable @typescript-eslint/no-explicit-any */
export const getAccessToken = () => {
  if (typeof localStorage !== "undefined") {
    return localStorage.getItem("accessToken");
  }
  return null;
};

export const setAccessToken = (token: string) => {
  if (typeof localStorage !== "undefined") {
    localStorage.setItem("accessToken", token);
  }
};

export const encodeData = (data: any): string => {
  const stringData = JSON.stringify(data);
  return encodeURIComponent(stringData);
};

export const decodeData = (encodedData: string): any => {
  try {
    const decodedString = decodeURIComponent(encodedData);
    return JSON.parse(decodedString);
  } catch (error: any) {
    console.error("Failed to decode data:", error);
    return null;
  }
};

export const getGenreByName = (categoryName: string) => {
  const data = {
    "드라마": {
      id: 1,
      title: "드라마",
    },
    "한국영화": {
      id: 2,
      title: "한국영화",
    },
    "해외영화": {
      id: 3,
      title: "해외영화",
    },
    "애니메이션": {
      id: 4,
      title: "애니",
    },
    "예능/오락": {
      id: 5,
      title: "예능",
    },
    "시사/교양": {
      id: 6,
      title: "시사/교양",
    },
    "음악프로": {
      id: 7,
      title: "음악",
    },
  };

  if (data[categoryName as keyof typeof data]) {
    return data[categoryName as keyof typeof data];
  }
  return null;
};

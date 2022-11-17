export type NinaSessionData = {
  activeTargetId: string;
  targets: {
    id: string;
    name: string;
    startTime: string;
    imageRecords: {
      id: string;
      index: number;
      fileName: string;
      fullPath: string;
      duration: number;
      filterName: string;
      detectedStars: number;
      HFR: number;
    }[];
  }[];
};

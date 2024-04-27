interface UrlItem {
  url: string, 
  name: string;
  suffix: string;
}
interface StepInstallsItem {
  id?: string;
  materialsUsedId: number | string;
  materialsUsedName?: string;
  processMethod: number | string;
  processMethodName?: string;
  resolution?: number | string;
  moduleTypeId?: number;
  moduleTypeName?: string;
  power: number | string;
  depth: number | string;
  times: number | string;
  otherParameters: string
  accelerationLevel?: number | string
}
interface SetpItem {
  id?: string;
  title: string
  photoVideo: string
  photoVideoList?: UrlItem[];
  stepDescription: string
  squareStepInstalls: StepInstallsItem[]
}
interface Form {
  id?: string | number;
  star?: number | string
  title: string
  firmwareVersion: string
  synopsis: string
  deviceId: string | number
  deviceName?: string
  workWidth: string | number
  workHeight: string | number
  workLength?: string | number
  squareMaterialsUseds: string[]
  tags: {
    tagsId: string
    name: string
  }[]
  materialInfo: string
  softwareId: string
  productionTime: number | string
  mainImage: string
  coverPicture: string
  annex: string
  squareSteps: SetpItem[]
}
interface CommunityData extends Form, CommunityItem{
  files: UrlItem[];
  ldsFiles: UrlItem[];
  mainImageList: UrlItem[];
  deviceName: string;
  location: string;
  power: number;
  views: number;
  createTime: string;
  softwareName: string;
}
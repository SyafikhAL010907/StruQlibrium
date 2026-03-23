import React from 'react';
import { 
  Construction, Warehouse, Factory, Waves, TowerControl as Tower, 
  SplitSquareVertical, Car, Activity, Layers, AlertTriangle, HardHat 
} from 'lucide-react';

export interface MissionInput {
  L?: number; P?: number; a?: number; oh?: number; w?: number; 
  w_max?: number; P_buckle?: number; W_veh?: number; veh_x?: number; 
  Sx?: number; Sy?: number; Txy?: number; H_wall?: number; 
  gamma?: number; Mp?: number; M_load?: number; ang_rot?: number;
  [key: string]: number | undefined;
}

export interface MissionData {
  id: number;
  name: string;
  icon: React.ReactNode;
  color: string;
  type: string;
  question: string;
  targetAns: string;
  checkFn: (i: MissionInput) => boolean;
}

export const MODULES_DATA: MissionData[] = [
  { id: 0, name: "Highway Bridge Girder", icon: <Construction size={20} />, color: "blue", type: "point", question: "Girder jambatan lebuhraya 6m. Lori logistik P=30kN berhenti tepat di tengah. Berapakah Momen Maksimum yang ditanggung?", targetAns: "L=6, P=30, a=3", checkFn: (i) => i.P===30 && i.L===6 && i.a===3 },
  { id: 1, name: "Luxury Villa Balcony", icon: <Warehouse size={20} />, color: "emerald", type: "overhang", question: "Struktur lantai balkoni L=8m dengan anjungan (overhang) 2m. Laraskan beban hujung seberat 15kN!", targetAns: "L=8, oh=2, P=15", checkFn: (i) => i.L===8 && i.oh===2 && i.P===15 },
  { id: 2, name: "Industrial Platform", icon: <Factory size={20} />, color: "cyan", type: "udl", question: "Lantai kilang dengan beban jentera agihan w=5 kN/m. Cari panjang rentang L agar momen tidak melebihi 40 kNm.", targetAns: "L=8, w=5", checkFn: (i) => i.L===8 && i.w===5 },
  { id: 3, name: "Reservoir Dam Wall", icon: <Waves size={20} />, color: "rose", type: "triangular", question: "Dinding empangan menahan tekanan hidrostatik air w_max=12 kN/m pada ketinggian 6m.", targetAns: "L=6, w_max=12", checkFn: (i) => i.L===6 && i.w_max===12 },
  { id: 11, name: "Port Crane System", icon: <Tower size={20} />, color: "indigo", type: "combined", question: "Boom kren pelabuhan 6m memikul beban angin w=5 kN/m dan kontena P=20kN di tengah.", targetAns: "L=6, w=5, P=20", checkFn: (i) => i.L===6 && i.w===5 && i.P===20 },
  { id: 12, name: "Skyscraper Steel Pile", icon: <SplitSquareVertical size={20} />, color: "rose", type: "buckling", question: "Cerucuk keluli bangunan tinggi: Tentukan beban kritikal tekuk P=100 kN pada kedalaman 5m.", targetAns: "L=5, P_buckle=100", checkFn: (i) => i.L===5 && i.P_buckle===100 },
  { id: 16, name: "Mainland Supply Route", icon: <Car size={20} />, color: "emerald", type: "moving-load", question: "Trak treler W=50kN melintasi jambatan persekutuan 8m. Simulasi kedudukan kritikal pada x=4m.", targetAns: "L=8, W_veh=50, veh_x=4", checkFn: (i) => i.L===8 && i.W_veh===50 && i.veh_x===4 },
  { id: 22, name: "Stress Lab", icon: <Activity size={20} />, color: "rose", type: "mohr", question: "Ujian makmal kegagalan keluli: Sx=60MPa, Sy=-20MPa, Txy=30MPa. Plot Bulatan Mohr untuk mencari tegangan utama.", targetAns: "Sx=60, Sy=-20, Txy=30", checkFn: (i) => i.Sx===60 && i.Sy===-20 && i.Txy===30 },
  { id: 31, name: "Slope Protection Wall", icon: <Layers size={20} />, color: "cyan", type: "retaining", question: "Dinding penahan cerun H=6m menahan tanah runtuh dengan densiti 18 kN/m³.", targetAns: "H_wall=6, gamma=18", checkFn: (i) => i.H_wall===6 && i.gamma===18 },
  { id: 38, name: "Ultimate Failure Limit", icon: <AlertTriangle size={20} />, color: "blue", type: "plastic", question: "Analisis pasca-kegagalan: Balok mengalami sendi plastis apabila M=80 melebihi kapasiti reka bentuk Mp=60.", targetAns: "M_load=80, Mp=60", checkFn: (i) => i.M_load===80 && i.Mp===60 }
];

export const MODULES: MissionData[] = Array.from({ length: 40 }, (_, i) => {
  const existing = MODULES_DATA.find(m => m.id === i);
  return existing || { 
    id: i, 
    name: `Eng. Project #${i+1}`, 
    icon: <HardHat size={20} />, 
    color: "indigo", 
    type: "point", 
    question: "Analisis simulasi teknikal berdasarkan parameter input yang diberikan untuk projek infrastruktur ini.", 
    targetAns: "Sesuai arahan", 
    checkFn: () => false 
  };
});

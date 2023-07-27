export interface ITask {
  id: string; 
  date: Date; 
  title: string; 
  listTags: string[]; 
  content: string; 
  list?: "" | "A fazer" | "Fazendo" | "Finalizado";
}

export interface IDataUser {
  name?: string;
  email?: string;
  avatar?: string | null;
}

export interface ICardView {
  view: "" | "A fazer" | "Fazendo" | "Finalizado";
}

export interface IRootReducer {
  useFilterSearch: IStateFilterSearch;
}

export interface IStateFilterSearch {
  currentFilter: string;
}

export interface IActionFilterSearch {
  type: string;
  payload: string;
}

export interface IConfigChart {
  series: number[];
  options: {
    colors: string[];
    labels: string[];
    legend: {
      position: "bottom";
    };
    responsive: [
      {
        breakpoint: number;
        options: {
          chart: {
            width: number;
          };
        };
      }
    ];
  };
}

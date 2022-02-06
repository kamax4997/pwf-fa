export interface ITimeRecord {
  id: string;
  timespent: string;
  startdate: string;
  enddate: string;
  notes?: string;
  task: {
    id: string;
  };
  running: boolean;
  contact: {
    id: string;
    fullname: string;
  }
}

export interface ITask {
  id: string;
  name: string;
  timerecords?: ITimeRecord[];
  taskTotalTimespent?: string;
}

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";

export type StartTimerecordInput = {
    taskid: number;
    notes?: unknown | null;
};
export type stopTimerMutationVariables = {
    input?: StartTimerecordInput | null;
};
export type stopTimerMutationResponse = {
    readonly stopTimerecord: {
        readonly id: string;
        readonly timespent: number | null;
        readonly startdate: unknown | null;
        readonly enddate: unknown | null;
        readonly running: boolean | null;
        readonly notes: unknown | null;
        readonly contact: {
            readonly id: string;
            readonly fullname: string | null;
        } | null;
    } | null;
};
export type stopTimerMutation = {
    readonly response: stopTimerMutationResponse;
    readonly variables: stopTimerMutationVariables;
};



/*
mutation stopTimerMutation(
  $input: StartTimerecordInput
) {
  stopTimerecord(input: $input) {
    id
    timespent
    startdate
    enddate
    running
    notes
    contact {
      id
      fullname
    }
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "input"
  }
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v2 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input"
      }
    ],
    "concreteType": "Timerecord",
    "kind": "LinkedField",
    "name": "stopTimerecord",
    "plural": false,
    "selections": [
      (v1/*: any*/),
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "timespent",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "startdate",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "enddate",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "running",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "notes",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "Contact",
        "kind": "LinkedField",
        "name": "contact",
        "plural": false,
        "selections": [
          (v1/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "fullname",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "stopTimerMutation",
    "selections": (v2/*: any*/),
    "type": "RootMutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "stopTimerMutation",
    "selections": (v2/*: any*/)
  },
  "params": {
    "cacheID": "435cd7a87b7a3c677287e8f4da23df44",
    "id": null,
    "metadata": {},
    "name": "stopTimerMutation",
    "operationKind": "mutation",
    "text": "mutation stopTimerMutation(\n  $input: StartTimerecordInput\n) {\n  stopTimerecord(input: $input) {\n    id\n    timespent\n    startdate\n    enddate\n    running\n    notes\n    contact {\n      id\n      fullname\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '202056515c537b8c8cf8c1e400cdc448';
export default node;

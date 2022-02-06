/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";

export type dashboardQueryVariables = {};
export type dashboardQueryResponse = {
    readonly tasks: ReadonlyArray<{
        readonly id: string;
        readonly name: string | null;
        readonly timerecords: ReadonlyArray<{
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
        } | null> | null;
        readonly timespent: number | null;
    } | null> | null;
};
export type dashboardQuery = {
    readonly response: dashboardQueryResponse;
    readonly variables: dashboardQueryVariables;
};



/*
query dashboardQuery {
  tasks(input: {limit: 10, orderby: {name: asc}, where: {displaytype: {NEQ: heading}}}) {
    id
    name
    timerecords {
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
    timespent
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "timespent",
  "storageKey": null
},
v2 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Literal",
        "name": "input",
        "value": {
          "limit": 10,
          "orderby": {
            "name": "asc"
          },
          "where": {
            "displaytype": {
              "NEQ": "heading"
            }
          }
        }
      }
    ],
    "concreteType": "Task",
    "kind": "LinkedField",
    "name": "tasks",
    "plural": true,
    "selections": [
      (v0/*: any*/),
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "name",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "Timerecord",
        "kind": "LinkedField",
        "name": "timerecords",
        "plural": true,
        "selections": [
          (v0/*: any*/),
          (v1/*: any*/),
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
              (v0/*: any*/),
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
      },
      (v1/*: any*/)
    ],
    "storageKey": "tasks(input:{\"limit\":10,\"orderby\":{\"name\":\"asc\"},\"where\":{\"displaytype\":{\"NEQ\":\"heading\"}}})"
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "dashboardQuery",
    "selections": (v2/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "dashboardQuery",
    "selections": (v2/*: any*/)
  },
  "params": {
    "cacheID": "16a70a37634d991bba7f69d5c5fcf632",
    "id": null,
    "metadata": {},
    "name": "dashboardQuery",
    "operationKind": "query",
    "text": "query dashboardQuery {\n  tasks(input: {limit: 10, orderby: {name: asc}, where: {displaytype: {NEQ: heading}}}) {\n    id\n    name\n    timerecords {\n      id\n      timespent\n      startdate\n      enddate\n      running\n      notes\n      contact {\n        id\n        fullname\n      }\n    }\n    timespent\n  }\n}\n"
  }
};
})();
(node as any).hash = '52f7644d6e775bcc1d3e58266c64a65f';
export default node;

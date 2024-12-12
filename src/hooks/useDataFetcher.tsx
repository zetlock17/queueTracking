import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loading from '../components/Loading/Loading';

interface Data {
    images: string[];
    megacount: {
        id: number;
        date: string;
        entrance: number;
        exit: number;
    },
    cafeteria_count: {
        count: number;
        capture_time: string;
    }[],
    detailed_megacount: {
        entrance: {
        [key: string]: number;
        },
        exit: {
        [key: string]: number;
        }
    }
}

let testData: Data = {
  images: ["../../accets/imgTest1.jpg", "../../accets/imgTest2.jpg", "../../accets/imgTest2.jpg"],
  megacount: {
    id: 1864309213873045504,
    date: "2024-12-05",
    entrance: 110,
    exit: 100
  },
  cafeteria_count: [
    {
      "count": 0,
      "capture_time": "2024-12-06T17:06:07+00:00"
  },
  {
      "count": 0,
      "capture_time": "2024-12-06T17:02:07+00:00"
  },
  {
      "count": 0,
      "capture_time": "2024-12-06T16:58:07+00:00"
  },
  {
      "count": 0,
      "capture_time": "2024-12-06T16:54:07+00:00"
  },
  {
      "count": 3,
      "capture_time": "2024-12-06T07:04:04+00:00"
  },
  {
      "count": 4,
      "capture_time": "2024-12-06T07:02:07+00:00"
  },
  {
      "count": 5,
      "capture_time": "2024-12-06T07:00:04+00:00"
  },
  {
      "count": 7,
      "capture_time": "2024-12-06T06:58:04+00:00"
  },
  {
      "count": 6,
      "capture_time": "2024-12-06T06:56:08+00:00"
  },
  {
      "count": 5,
      "capture_time": "2024-12-06T06:54:04+00:00"
  },
  {
      "count": 4,
      "capture_time": "2024-12-06T06:52:04+00:00"
  },
  {
      "count": 4,
      "capture_time": "2024-12-06T06:50:11+00:00"
  },
  {
      "count": 4,
      "capture_time": "2024-12-06T06:48:04+00:00"
  },
  {
      "count": 2,
      "capture_time": "2024-12-06T06:46:04+00:00"
  },
  {
      "count": 5,
      "capture_time": "2024-12-06T06:44:04+00:00"
  },
  {
      "count": 3,
      "capture_time": "2024-12-06T06:42:04+00:00"
  },
  {
      "count": 3,
      "capture_time": "2024-12-06T06:40:04+00:00"
  },
  {
      "count": 5,
      "capture_time": "2024-12-06T06:38:04+00:00"
  },
  {
      "count": 5,
      "capture_time": "2024-12-06T06:36:07+00:00"
  },
  {
      "count": 3,
      "capture_time": "2024-12-06T06:34:04+00:00"
  },
  {
      "count": 3,
      "capture_time": "2024-12-06T06:32:04+00:00"
  },
  {
      "count": 5,
      "capture_time": "2024-12-06T06:30:07+00:00"
  },
  {
      "count": 2,
      "capture_time": "2024-12-06T06:28:04+00:00"
  },
  {
      "count": 4,
      "capture_time": "2024-12-06T06:26:04+00:00"
  },
  {
      "count": 2,
      "capture_time": "2024-12-06T06:24:10+00:00"
  },
  {
      "count": 2,
      "capture_time": "2024-12-06T06:22:04+00:00"
  },
  {
      "count": 6,
      "capture_time": "2024-12-06T06:20:04+00:00"
  },
  {
      "count": 5,
      "capture_time": "2024-12-06T06:18:10+00:00"
  },
  {
      "count": 8,
      "capture_time": "2024-12-06T06:16:04+00:00"
  },
  {
      "count": 4,
      "capture_time": "2024-12-06T06:14:04+00:00"
  },
  {
      "count": 6,
      "capture_time": "2024-12-06T06:12:04+00:00"
  },
  {
      "count": 3,
      "capture_time": "2024-12-06T06:10:04+00:00"
  },
  {
      "count": 4,
      "capture_time": "2024-12-06T06:08:04+00:00"
  },
  {
      "count": 2,
      "capture_time": "2024-12-06T06:06:04+00:00"
  },
  {
      "count": 7,
      "capture_time": "2024-12-06T06:04:04+00:00"
  },
  {
      "count": 4,
      "capture_time": "2024-12-06T06:02:04+00:00"
  },
  {
      "count": 5,
      "capture_time": "2024-12-06T06:00:04+00:00"
  },
  {
      "count": 0,
      "capture_time": "2024-12-06T05:58:07+00:00"
  },
  {
      "count": 2,
      "capture_time": "2024-12-06T05:56:04+00:00"
  },
  {
      "count": 3,
      "capture_time": "2024-12-06T05:54:04+00:00"
  },
  {
      "count": 1,
      "capture_time": "2024-12-06T05:52:07+00:00"
  },
  {
      "count": 2,
      "capture_time": "2024-12-06T05:50:04+00:00"
  },
  {
      "count": 2,
      "capture_time": "2024-12-06T05:48:04+00:00"
  },
  {
      "count": 2,
      "capture_time": "2024-12-06T05:46:11+00:00"
  },
  {
      "count": 7,
      "capture_time": "2024-12-06T05:44:04+00:00"
  },
  {
      "count": 5,
      "capture_time": "2024-12-06T05:42:04+00:00"
  },
  {
      "count": 4,
      "capture_time": "2024-12-06T05:40:08+00:00"
  },
  {
      "count": 6,
      "capture_time": "2024-12-06T05:38:07+00:00"
  },
  {
      "count": 5,
      "capture_time": "2024-12-06T05:36:04+00:00"
  },
  {
      "count": 7,
      "capture_time": "2024-12-06T05:34:04+00:00"
  },
  {
      "count": 8,
      "capture_time": "2024-12-06T05:32:04+00:00"
  },
  {
      "count": 9,
      "capture_time": "2024-12-06T05:30:04+00:00"
  },
  {
      "count": 7,
      "capture_time": "2024-12-06T05:28:04+00:00"
  },
  {
      "count": 10,
      "capture_time": "2024-12-06T05:26:11+00:00"
  },
  {
      "count": 9,
      "capture_time": "2024-12-06T05:24:04+00:00"
  },
  {
      "count": 7,
      "capture_time": "2024-12-06T05:22:04+00:00"
  },
  {
      "count": 11,
      "capture_time": "2024-12-06T05:20:11+00:00"
  },
  {
      "count": 15,
      "capture_time": "2024-12-06T05:18:04+00:00"
  },
  {
      "count": 12,
      "capture_time": "2024-12-06T05:16:04+00:00"
  },
  {
      "count": 15,
      "capture_time": "2024-12-06T05:14:04+00:00"
  },
  {
      "count": 14,
      "capture_time": "2024-12-06T05:12:11+00:00"
  },
  {
      "count": 12,
      "capture_time": "2024-12-06T05:10:04+00:00"
  },
  {
      "count": 12,
      "capture_time": "2024-12-06T05:08:04+00:00"
  },
  {
      "count": 11,
      "capture_time": "2024-12-06T05:06:07+00:00"
  },
  {
      "count": 12,
      "capture_time": "2024-12-06T05:04:04+00:00"
  },
  {
      "count": 17,
      "capture_time": "2024-12-06T05:02:04+00:00"
  },
  {
      "count": 16,
      "capture_time": "2024-12-06T05:00:05+00:00"
  },
  {
      "count": 9,
      "capture_time": "2024-12-06T04:58:04+00:00"
  },
  {
      "count": 13,
      "capture_time": "2024-12-06T04:56:04+00:00"
  },
  {
      "count": 16,
      "capture_time": "2024-12-06T04:54:07+00:00"
  },
  {
      "count": 7,
      "capture_time": "2024-12-06T04:52:04+00:00"
  },
  {
      "count": 17,
      "capture_time": "2024-12-06T04:50:04+00:00"
  },
  {
      "count": 18,
      "capture_time": "2024-12-06T04:48:11+00:00"
  },
  {
      "count": 13,
      "capture_time": "2024-12-06T04:46:04+00:00"
  },
  {
      "count": 15,
      "capture_time": "2024-12-06T04:44:04+00:00"
  },
  {
      "count": 17,
      "capture_time": "2024-12-06T04:42:04+00:00"
  },
  {
      "count": 18,
      "capture_time": "2024-12-06T04:40:05+00:00"
  },
  {
      "count": 22,
      "capture_time": "2024-12-06T04:38:04+00:00"
  },
  {
      "count": 26,
      "capture_time": "2024-12-06T04:36:10+00:00"
  },
  {
      "count": 28,
      "capture_time": "2024-12-06T04:34:04+00:00"
  },
  {
      "count": 29,
      "capture_time": "2024-12-06T04:32:04+00:00"
  },
  {
      "count": 22,
      "capture_time": "2024-12-06T04:30:04+00:00"
  },
  {
      "count": 19,
      "capture_time": "2024-12-06T04:28:11+00:00"
  },
  {
      "count": 11,
      "capture_time": "2024-12-06T04:26:04+00:00"
  },
  {
      "count": 13,
      "capture_time": "2024-12-06T04:24:04+00:00"
  },
  {
      "count": 9,
      "capture_time": "2024-12-06T04:22:07+00:00"
  },
  {
      "count": 9,
      "capture_time": "2024-12-06T04:20:04+00:00"
  },
  {
      "count": 8,
      "capture_time": "2024-12-06T04:18:04+00:00"
  },
  {
      "count": 10,
      "capture_time": "2024-12-06T04:16:04+00:00"
  },
  {
      "count": 10,
      "capture_time": "2024-12-06T04:14:04+00:00"
  },
  {
      "count": 9,
      "capture_time": "2024-12-06T04:12:04+00:00"
  },
  {
      "count": 14,
      "capture_time": "2024-12-06T04:10:11+00:00"
  },
  {
      "count": 12,
      "capture_time": "2024-12-06T04:08:05+00:00"
  },
  {
      "count": 12,
      "capture_time": "2024-12-06T04:06:04+00:00"
  },
  {
      "count": 9,
      "capture_time": "2024-12-06T04:04:04+00:00"
  },
  {
      "count": 11,
      "capture_time": "2024-12-06T04:02:04+00:00"
  },
  {
      "count": 13,
      "capture_time": "2024-12-06T04:00:04+00:00"
  },
  {
      "count": 16,
      "capture_time": "2024-12-06T03:58:04+00:00"
  },
  {
      "count": 14,
      "capture_time": "2024-12-06T03:56:10+00:00"
  },
  {
      "count": 17,
      "capture_time": "2024-12-06T03:54:04+00:00"
  },
  {
      "count": 14,
      "capture_time": "2024-12-06T03:52:04+00:00"
  },
  {
      "count": 16,
      "capture_time": "2024-12-06T03:50:04+00:00"
  },
  {
      "count": 16,
      "capture_time": "2024-12-06T03:48:04+00:00"
  },
  {
      "count": 22,
      "capture_time": "2024-12-06T03:46:04+00:00"
  },
  {
      "count": 25,
      "capture_time": "2024-12-06T03:44:04+00:00"
  },
  {
      "count": 22,
      "capture_time": "2024-12-06T03:42:07+00:00"
  },
  {
      "count": 27,
      "capture_time": "2024-12-06T03:40:04+00:00"
  },
  {
      "count": 23,
      "capture_time": "2024-12-06T03:38:04+00:00"
  },
  {
      "count": 23,
      "capture_time": "2024-12-06T03:36:05+00:00"
  },
  {
      "count": 20,
      "capture_time": "2024-12-06T03:34:04+00:00"
  },
  {
      "count": 26,
      "capture_time": "2024-12-06T03:32:04+00:00"
  },
  {
      "count": 23,
      "capture_time": "2024-12-06T03:30:04+00:00"
  },
  {
      "count": 24,
      "capture_time": "2024-12-06T03:28:07+00:00"
  },
  {
      "count": 38,
      "capture_time": "2024-12-06T03:26:04+00:00"
  },
  {
      "count": 24,
      "capture_time": "2024-12-06T03:24:04+00:00"
  },
  {
      "count": 30,
      "capture_time": "2024-12-06T03:22:04+00:00"
  },
  {
      "count": 25,
      "capture_time": "2024-12-06T03:20:04+00:00"
  },
  {
      "count": 25,
      "capture_time": "2024-12-06T03:18:04+00:00"
  },
  {
      "count": 29,
      "capture_time": "2024-12-06T03:16:11+00:00"
  },
  {
      "count": 17,
      "capture_time": "2024-12-06T03:14:05+00:00"
  },
  {
      "count": 28,
      "capture_time": "2024-12-06T03:12:04+00:00"
  },
  {
      "count": 32,
      "capture_time": "2024-12-06T03:10:04+00:00"
  },
  {
      "count": 36,
      "capture_time": "2024-12-06T03:08:07+00:00"
  },
  {
      "count": 32,
      "capture_time": "2024-12-06T03:06:04+00:00"
  },
  {
      "count": 27,
      "capture_time": "2024-12-06T03:04:04+00:00"
  },
  {
      "count": 28,
      "capture_time": "2024-12-06T03:02:07+00:00"
  },
  {
      "count": 26,
      "capture_time": "2024-12-06T03:00:04+00:00"
  },
  {
      "count": 15,
      "capture_time": "2024-12-06T02:58:04+00:00"
  },
  {
      "count": 16,
      "capture_time": "2024-12-06T02:56:07+00:00"
  },
  {
      "count": 19,
      "capture_time": "2024-12-06T02:54:04+00:00"
  },
  {
      "count": 19,
      "capture_time": "2024-12-06T02:52:04+00:00"
  },
  {
      "count": 16,
      "capture_time": "2024-12-06T02:50:07+00:00"
  },
  {
      "count": 16,
      "capture_time": "2024-12-06T02:48:04+00:00"
  },
  {
      "count": 15,
      "capture_time": "2024-12-06T02:46:07+00:00"
  },
  {
      "count": 13,
      "capture_time": "2024-12-06T02:44:04+00:00"
  },
  {
      "count": 17,
      "capture_time": "2024-12-06T02:42:04+00:00"
  },
  {
      "count": 19,
      "capture_time": "2024-12-06T02:40:07+00:00"
  },
  {
      "count": 22,
      "capture_time": "2024-12-06T02:38:04+00:00"
  },
  {
      "count": 19,
      "capture_time": "2024-12-06T02:36:04+00:00"
  },
  {
      "count": 19,
      "capture_time": "2024-12-06T02:34:11+00:00"
  },
  {
      "count": 12,
      "capture_time": "2024-12-06T02:32:04+00:00"
  },
  {
      "count": 11,
      "capture_time": "2024-12-06T02:30:04+00:00"
  },
  {
      "count": 14,
      "capture_time": "2024-12-06T02:28:04+00:00"
  },
  {
      "count": 14,
      "capture_time": "2024-12-06T02:26:04+00:00"
  },
  {
      "count": 13,
      "capture_time": "2024-12-06T02:24:11+00:00"
  },
  {
      "count": 13,
      "capture_time": "2024-12-06T02:22:04+00:00"
  },
  {
      "count": 14,
      "capture_time": "2024-12-06T02:20:04+00:00"
  },
  {
      "count": 13,
      "capture_time": "2024-12-06T02:18:04+00:00"
  },
  {
      "count": 14,
      "capture_time": "2024-12-06T02:16:04+00:00"
  },
  {
      "count": 17,
      "capture_time": "2024-12-06T02:14:11+00:00"
  },
  {
      "count": 9,
      "capture_time": "2024-12-06T02:12:04+00:00"
  },
  {
      "count": 23,
      "capture_time": "2024-12-06T02:10:04+00:00"
  },
  {
      "count": 26,
      "capture_time": "2024-12-06T02:08:04+00:00"
  },
  {
      "count": 21,
      "capture_time": "2024-12-06T02:06:04+00:00"
  },
  {
      "count": 26,
      "capture_time": "2024-12-06T02:04:11+00:00"
  },
  {
      "count": 28,
      "capture_time": "2024-12-06T02:02:05+00:00"
  },
  {
      "count": 25,
      "capture_time": "2024-12-06T02:00:04+00:00"
  },
  {
      "count": 23,
      "capture_time": "2024-12-06T01:58:04+00:00"
  },
  {
      "count": 18,
      "capture_time": "2024-12-06T01:56:04+00:00"
  },
  {
      "count": 29,
      "capture_time": "2024-12-06T01:54:07+00:00"
  },
  {
      "count": 25,
      "capture_time": "2024-12-06T01:52:05+00:00"
  },
  {
      "count": 29,
      "capture_time": "2024-12-06T01:50:04+00:00"
  },
  {
      "count": 21,
      "capture_time": "2024-12-06T01:48:04+00:00"
  },
  {
      "count": 23,
      "capture_time": "2024-12-06T01:46:04+00:00"
  },
  {
      "count": 30,
      "capture_time": "2024-12-06T01:44:11+00:00"
  },
  {
      "count": 28,
      "capture_time": "2024-12-06T01:42:04+00:00"
  },
  {
      "count": 20,
      "capture_time": "2024-12-06T01:40:04+00:00"
  },
  {
      "count": 27,
      "capture_time": "2024-12-06T01:38:10+00:00"
  },
  {
      "count": 19,
      "capture_time": "2024-12-06T01:36:04+00:00"
  },
  {
      "count": 11,
      "capture_time": "2024-12-06T01:34:04+00:00"
  },
  {
      "count": 9,
      "capture_time": "2024-12-06T01:32:11+00:00"
  },
  {
      "count": 11,
      "capture_time": "2024-12-06T01:30:04+00:00"
  },
  {
      "count": 11,
      "capture_time": "2024-12-06T01:28:04+00:00"
  },
  {
      "count": 7,
      "capture_time": "2024-12-06T01:26:04+00:00"
  },
  {
      "count": 6,
      "capture_time": "2024-12-06T01:24:04+00:00"
  },
  {
      "count": 8,
      "capture_time": "2024-12-06T01:22:07+00:00"
  },
  {
      "count": 8,
      "capture_time": "2024-12-06T01:20:04+00:00"
  },
  {
      "count": 13,
      "capture_time": "2024-12-06T01:18:09+00:00"
  },
  {
      "count": 14,
      "capture_time": "2024-12-06T01:16:04+00:00"
  },
  {
      "count": 11,
      "capture_time": "2024-12-06T01:14:04+00:00"
  },
  {
      "count": 9,
      "capture_time": "2024-12-06T01:12:11+00:00"
  },
  {
      "count": 11,
      "capture_time": "2024-12-06T01:10:04+00:00"
  },
  {
      "count": 11,
      "capture_time": "2024-12-06T01:08:04+00:00"
  },
  {
      "count": 8,
      "capture_time": "2024-12-06T01:06:04+00:00"
  },
  {
      "count": 6,
      "capture_time": "2024-12-06T01:04:04+00:00"
  },
  {
      "count": 8,
      "capture_time": "2024-12-06T01:02:04+00:00"
  },
  {
      "count": 9,
      "capture_time": "2024-12-06T01:00:11+00:00"
  },
  {
      "count": 9,
      "capture_time": "2024-12-06T00:58:04+00:00"
  },
  {
      "count": 7,
      "capture_time": "2024-12-06T00:56:04+00:00"
  },
  {
      "count": 6,
      "capture_time": "2024-12-06T00:54:05+00:00"
  },
  {
      "count": 7,
      "capture_time": "2024-12-06T00:52:04+00:00"
  },
  {
      "count": 6,
      "capture_time": "2024-12-06T00:50:04+00:00"
  },
  {
      "count": 4,
      "capture_time": "2024-12-06T00:48:11+00:00"
  },
  {
      "count": 4,
      "capture_time": "2024-12-06T00:46:07+00:00"
  },
  {
      "count": 7,
      "capture_time": "2024-12-06T00:44:04+00:00"
  },
  {
      "count": 7,
      "capture_time": "2024-12-06T00:42:04+00:00"
  },
  {
      "count": 11,
      "capture_time": "2024-12-06T00:40:04+00:00"
  },
  {
      "count": 10,
      "capture_time": "2024-12-06T00:38:11+00:00"
  },
  {
      "count": 3,
      "capture_time": "2024-12-06T00:36:07+00:00"
  },
  {
      "count": 8,
      "capture_time": "2024-12-06T00:34:04+00:00"
  },
  {
      "count": 6,
      "capture_time": "2024-12-06T00:32:04+00:00"
  },
  {
      "count": 9,
      "capture_time": "2024-12-06T00:30:04+00:00"
  },
  {
      "count": 11,
      "capture_time": "2024-12-06T00:28:07+00:00"
  },
  {
      "count": 3,
      "capture_time": "2024-12-06T00:26:04+00:00"
  },
  {
      "count": 4,
      "capture_time": "2024-12-06T00:24:04+00:00"
  },
  {
      "count": 3,
      "capture_time": "2024-12-06T00:22:07+00:00"
  },
  {
      "count": 5,
      "capture_time": "2024-12-06T00:20:04+00:00"
  },
  {
      "count": 9,
      "capture_time": "2024-12-06T00:18:04+00:00"
  },
  {
      "count": 8,
      "capture_time": "2024-12-06T00:16:04+00:00"
  },
  {
      "count": 7,
      "capture_time": "2024-12-06T00:14:04+00:00"
  },
  {
      "count": 9,
      "capture_time": "2024-12-06T00:12:11+00:00"
  },
  {
      "count": 9,
      "capture_time": "2024-12-06T00:10:04+00:00"
  },
  {
      "count": 8,
      "capture_time": "2024-12-06T00:08:04+00:00"
  },
  {
      "count": 6,
      "capture_time": "2024-12-06T00:06:07+00:00"
  },
  {
      "count": 10,
      "capture_time": "2024-12-06T00:04:04+00:00"
  },
  {
      "count": 7,
      "capture_time": "2024-12-06T00:02:04+00:00"
  },
  {
      "count": 14,
      "capture_time": "2024-12-06T00:00:11+00:00"
  }
  ],
  detailed_megacount: {
    entrance: {
        "2024-12-03T00:00:00+10:00": 0,
        "2024-12-03T01:00:00+10:00": 0,
        "2024-12-03T02:00:00+10:00": 0,
        "2024-12-03T03:00:00+10:00": 0,
        "2024-12-03T04:00:00+10:00": 0,
        "2024-12-03T05:00:00+10:00": 1,
        "2024-12-03T06:00:00+10:00": 3,
        "2024-12-03T07:00:00+10:00": 14,
        "2024-12-03T08:00:00+10:00": 17,
        "2024-12-03T09:00:00+10:00": 24,
        "2024-12-03T10:00:00+10:00": 40,
        "2024-12-03T11:00:00+10:00": 111,
        "2024-12-03T12:00:00+10:00": 126,
        "2024-12-03T13:00:00+10:00": 133,
        "2024-12-03T14:00:00+10:00": 63,
        "2024-12-03T15:00:00+10:00": 80,
        "2024-12-03T16:00:00+10:00": 42,
        "2024-12-03T17:00:00+10:00": 7
    },
    exit: {
        "2024-12-03T00:00:00+10:00": 0,
        "2024-12-03T01:00:00+10:00": 0,
        "2024-12-03T02:00:00+10:00": 0,
        "2024-12-03T03:00:00+10:00": 0,
        "2024-12-03T04:00:00+10:00": 0,
        "2024-12-03T05:00:00+10:00": 0,
        "2024-12-03T06:00:00+10:00": 2,
        "2024-12-03T07:00:00+10:00": 11,
        "2024-12-03T08:00:00+10:00": 14,
        "2024-12-03T09:00:00+10:00": 27,
        "2024-12-03T10:00:00+10:00": 33,
        "2024-12-03T11:00:00+10:00": 66,
        "2024-12-03T12:00:00+10:00": 114,
        "2024-12-03T13:00:00+10:00": 146,
        "2024-12-03T14:00:00+10:00": 114,
        "2024-12-03T15:00:00+10:00": 91,
        "2024-12-03T16:00:00+10:00": 72,
        "2024-12-03T17:00:00+10:00": 41
    }
  }
}

interface DataFetcherProps {
  params: {
    date: string;
    place: string;
  }
  onDataFetched: (data: Data) => void;
}

const DataFetcher: React.FC<DataFetcherProps> = ({ params, onDataFetched }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const url = 'any url';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<Data>(url, { params });
        onDataFetched(response.data);
        setLoading(false);
      } catch (err) {
        setError('Ошибка при загрузке данных');
        setLoading(false);
      }
      onDataFetched(testData); {/* удалить потом */}
    };

    fetchData();
  }, [url, params, onDataFetched]);

  if (loading) {
    return <Loading />;
  }

//   if (error) {
//     return <div>{error}</div>;
//   } расскоментировать потом

  return null;
};

export default DataFetcher;

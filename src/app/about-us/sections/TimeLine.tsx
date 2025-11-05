"use client";

import React from 'react';
import { TimeLineColors } from '../components/TimeLineColors';

export default function TimeLine() {
  return (
    <div className="w-full h-[100vh] flex flex-col justify-between">
      <TimeLineColors />
    </div>
  );
}


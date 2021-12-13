import React from "react";

const TabIcon = ({ className, active, title, progressClass, page }: any) => {
  const isActive = active
    ? "nav-link mb-sm-3 active"
    : "nav-link mb-sm-3 text-gray";
  return (
    <li className="nav-item">
      <span
        className={isActive}
        id="home-tab"
        data-toggle="tab"
        role="tab"
        aria-controls="home"
        aria-selected="true"
      >
        {title}
      </span>
    </li>
  );
};

export default function StepProgress({ page }: any) {
  return (
    <ul
      className="nav nav-pills nav-fill flex-column flex-sm-row font-14 font-weight-900 col-lg-12 pb-10 borderbottom"
      id="myTab"
      role="tablist"
    >
      <TabIcon page={1} title="INTRODUCTION" active={page === 1} />
      <TabIcon page={2} title="STEP 1" active={page === 2} />
      <TabIcon page={3} title="STEP 2" active={page === 3} />
      <TabIcon page={4} title="STEP 3" active={page === 4} />
      <TabIcon page={5} title="REVIEW" active={page === 5} />
    </ul>
  );
}

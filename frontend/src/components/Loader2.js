import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
function Loader() {
  return (
    <tbody>
      <tr>
        <td>
          <div>
            <SkeletonTheme color="white" highlightColor="#E1E0DD">
              <p>
                <Skeleton count={15} />
              </p>
            </SkeletonTheme>
          </div>
        </td>
        <td>
          <div>
            <SkeletonTheme color="white" highlightColor="#E1E0DD">
              <p>
                <Skeleton count={15} />
              </p>
            </SkeletonTheme>
          </div>
        </td>
        <td>
          <div>
            <SkeletonTheme color="white" highlightColor="#E1E0DD">
              <p>
                <Skeleton count={15} />
              </p>
            </SkeletonTheme>
          </div>
        </td>
        <td>
          <div>
            <SkeletonTheme color="white" highlightColor="#E1E0DD">
              <p>
                <Skeleton count={15} />
              </p>
            </SkeletonTheme>
          </div>
        </td>
        <td>
          <div>
            <SkeletonTheme color="white" highlightColor="#E1E0DD">
              <p>
                <Skeleton count={15} />
              </p>
            </SkeletonTheme>
          </div>
        </td>
        <td>
          <div>
            <SkeletonTheme color="white" highlightColor="#E1E0DD">
              <p>
                <Skeleton count={15} />
              </p>
            </SkeletonTheme>
          </div>
        </td>
        <td>
          <div>
            <SkeletonTheme color="white" highlightColor="#E1E0DD">
              <p>
                <Skeleton count={15} />
              </p>
            </SkeletonTheme>
          </div>
        </td>
      </tr>
    </tbody>
  );
}

export default Loader;

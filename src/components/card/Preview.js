import React from "react";
import { Link } from "react-router-dom";
const Preview = ({ post }) => {
  return (
    <div className="card mb-3" style={{ minWidth: "280px" }}>
      <div className="row g-0">
        <div
          className="col-md-4"
          style={{
            minHeight: "150px",
            maxHeight: "170px",
            overflow: "hidden",
          }}
        >
          {post.thumbnail && (
            <>
              {typeof post.thumbnail === "string" ? (
                <Link to={`post/${post.id}`}>
                  <img
                    src={post.thumbnail}
                    className="w-100 h-100"
                    alt="thumbnail"
                    style={{ objectFit: "cover" }}
                  />
                </Link>
              ) : (
                <img
                  src={URL.createObjectURL(post.thumbnail)}
                  className="w-100 h-100"
                  alt="thumbnail"
                  style={{ objectFit: "cover" }}
                />
              )}
            </>
          )}
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h5 className="card-title">{post.title}</h5>
            <p className="card-text">{post.description}</p>
            <p className="card-text">
              <small className="text-muted">
                {post.createdAt}
              </small>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Preview;

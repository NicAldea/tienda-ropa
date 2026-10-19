import { Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router";
import BlogCard from "../components/BlogCard";
import { BLOGS } from "../data/blogs";
import { ROUTE_PATHS } from "../utils/constants";

// blogs llega como prop (con valor por defecto) para poder probar la lista con otros datos
function Blogs({ blogs = BLOGS }) {
  const navigate = useNavigate();

  return (
    <>
      <h1>Blogs</h1>
      <hr />
      <Row className="g-4">
        {blogs.map((blog) => (
          <Col key={blog.id} xs={12} md={6}>
            <BlogCard
              title={blog.title}
              date={blog.date}
              summary={blog.summary}
              image={blog.image}
              onReadMore={() => navigate(ROUTE_PATHS.BLOG_DETAIL_WITH_ID(blog.id))}
            />
          </Col>
        ))}
      </Row>
    </>
  );
}

export default Blogs;

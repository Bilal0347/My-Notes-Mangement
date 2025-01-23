import { Col, Row, Badge, Stack, Button } from "react-bootstrap";
import ReactMarkdown from "react-markdown";
import { useNote } from "./note-layout";

const NoteShow = () => {
  const note = useNote();
  console.log("ddd", note);
  return (
    <>
      <Row className="align-items-center mb-4">
        <Col>
          <h1>{note.title}</h1>
          {note.tags.length > 0 && (
            <Stack gap={1} direction="horizontal" className="flex-wrap">
              {note.tags.map((tag) => (
                <Badge className="text-truncate" key={tag.id}>
                  {" "}
                  {tag.label}
                </Badge>
              ))}
            </Stack>
          )}
        </Col>
        <Col xs="auto">
          <Stack direction="horizontal" gap={2}>
            <Button href={`/${note.id}/edit`} variant="primary">
              Edit
            </Button>
            <Button href="/new" variant="outline-danger">
              Delete
            </Button>
            <Button href="/" variant="outline-secondary">
              Back
            </Button>
          </Stack>
        </Col>
      </Row>
      <ReactMarkdown>{note.markdown}</ReactMarkdown>
    </>
  );
};

export default NoteShow;

import { Badge, Button, Card, Col, Form, Row, Stack } from "react-bootstrap";
import { useState, useMemo } from "react";
import ReactSelect from "react-select";
import { Tag, Note } from "../type";
import { Link } from "react-router-dom";
import styles from "./note-list.module.css";

type NoteListProps = {
  availableTags: Tag[];
  notes: NoteCardProps[];
};

type NoteCardProps = {
  id: string;
  title: string;
  tags: Tag[];
};

const NoteList = ({ availableTags, notes }: NoteListProps) => {
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [search, setSearch] = useState<string>("");
  const searchedNotes = useMemo(() => {
    return notes.filter((note) => {
      return (
        (search === "" ||
          note.title.toLowerCase().includes(search.toLowerCase())) &&
        (selectedTags.length === 0 ||
          selectedTags.every((tag) => {
            note.tags.some((noteTag) => noteTag.id === tag.id);
          }))
      );
    });
  }, [search, selectedTags, notes]);
  return (
    <>
      <Row className="align-items-center mb-4">
        <Col>
          <h1>Notes</h1>
        </Col>
        <Col xs="auto">
          <Stack direction="horizontal" gap={2}>
            <Button href="/new" variant="primary">
              Create
            </Button>
            <Button href="/new" variant="outline-secondary">
              Edit Tags
            </Button>
          </Stack>
        </Col>
      </Row>
      <Row className="mb-4">
        <Col>
          <Form.Group controlId="title">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter title"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="tags">
            <Form.Label>Tags</Form.Label>
            <ReactSelect
              isMulti
              options={availableTags.map((tag) => {
                return { label: tag.label, value: tag.id };
              })}
              value={selectedTags.map((tag) => {
                return { label: tag.label, value: tag.id };
              })}
              onChange={(tags) => {
                setSelectedTags(
                  tags.map((tag) => {
                    return { label: tag.label, id: tag.value };
                  })
                );
              }}
            />
          </Form.Group>
        </Col>
      </Row>
      <Row xs={1} sm={2} lg={3} xl={4} className="g-3">
        {searchedNotes.map((note) => (
          <Col key={note.id}>
            <NoteCard id={note.id} title={note.title} tags={note.tags} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default NoteList;

function NoteCard({ id, title, tags }: NoteCardProps) {
  return (
    <Card
      as={Link}
      to={`/${id}`}
      className={`h-100 text-reset text-decoration-none ${styles.card}`}
    >
      <Card.Body>
        <Stack
          gap={2}
          className="align-items-center justify-content-center h-100"
        >
          <span className="fs-5">{title} </span>
          {tags.length > 0 && (
            <Stack
              gap={1}
              direction="horizontal"
              className="justify-content-center flex-wrap"
            >
              {tags.map((tag) => (
                <Badge className="text-truncate" key={tag.id}>
                  {" "}
                  {tag.label}
                </Badge>
              ))}
            </Stack>
          )}
        </Stack>
      </Card.Body>
    </Card>
  );
}

import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import styled from "styled-components"
import RichTextCustom from "../components/richText"

const Form = styled.form`
  padding: 10px;
  background: #eee;
  margin-top: 20px;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;

  input {
    margin-bottom: 10px;
    width: 100%;
    height: 40px;
    border: 1px solid #eee;
    border-radius: 4px;
  }

  textarea {
    margin-bottom: 10px;
    width: 100%;
    height: 100px;
    border: 1px solid #eee;
    border-radius: 4px;
    resize: none;
  }
`
const Button = styled.button`
  background: orange;
  color: white;
  cursor: pointer;
  padding: 4px 8px;
  box-shadow: none;
  border-radius: 4px;
`

const ContentWrapper = styled.section`
  max-width: 800px;
  margin: 0 auto;
`

export const query = graphql`
  {
    prismic {
      allContact_pages {
        edges {
          node {
            form_title
            form_description
            form_fields {
              field_name
              field_type
              required
            }
          }
        }
      }
    }
  }
`
const ContactUs = props => {
  console.log(props)
  return (
    <Layout>
      <ContentWrapper>
        <RichTextCustom
          render={props.data.prismic.allContact_pages.edges[0].node.form_title}
        />
        <RichTextCustom
          render={
            props.data.prismic.allContact_pages.edges[0].node.form_description
          }
        />
        <Form
          name="contact-us"
          method="POST"
          data-netify="true"
          action="/contact-success"
        >
          <input type="hidden" name="form-name" value="contact-us" />
          {props.data.prismic.allContact_pages.edges[0].node.form_fields.map(
            (field, i) => {
              if (field.field_type === "textarea") {
                return (
                  <div key={i}>
                    <textarea
                      required={field.required === "Yes"}
                      placeholder={field.field_name}
                    />
                  </div>
                )
              } else {
                return (
                  <div key={i}>
                    <input
                      type={field.field_type}
                      required={field.required === "Yes"}
                      placeholder={field.field_name}
                    />
                  </div>
                )
              }
            }
          )}
          <Button type="submit">Submit</Button>
        </Form>
      </ContentWrapper>
    </Layout>
  )
}

export default ContactUs

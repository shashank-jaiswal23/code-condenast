import axios from 'axios'
const listLocales = 'i18n/locales'
export const getEntry = async (locale) => {
  try {
    const dataPath = `${process.env.HOST}${process.env.CONTENT}?_locale=${locale}`
    const dataEngPath = `${process.env.HOST}${process.env.CONTENT}?_locale=en`
    const authPath = `${process.env.HOST}auth/local`
    const credentials = {
      identifier: process.env.USERNAME,
      password: process.env.PASSWORD,
    }
    const { data } = await axios.post(`${authPath}`, credentials)
    const token = data && data.jwt
    const headers = { Authorization: `Bearer ${token}` }
    const currentLang = await axios
      .get(dataPath, { headers })
      .then((resp) => resp.data)
    const entryval = await axios
      .get(dataEngPath, { headers })
      .then((resp) => resp.data)

    const localesList = await axios
      .get(`${process.env.HOST}${listLocales}`, { headers })
      .then((resp) => resp.data)

    const fetchCoverMedia = (data) => {
      if (!data) return {}
      return {
        fields: {
          title: data.name,
          file: {
            url: data.url,
            details: {
              image: {
                width: data.width,
                height: data.height,
              },
            },
            fileName: data.name,
            contentType: data.mime,
          },
        },
      }
    }

    const nestedContent = (data) => {
      return {
        nodeType: 'text',
        value: data,
        marks: [],
        data: {},
      }
    }

    const customContent = (value) => {
      const headingCount = value.split('#').length - 1
      const nodeType =
        value === '' || !headingCount ? 'paragraph' : `heading-${headingCount}`
      const updatedValue = value ? value.replace(/[#*]/g, '') : ''
      const markType =
        value.split('*').length - 1 === 4
          ? 'bold'
          : value.split('*').length - 1 === 2
          ? 'italic'
          : 0
      const marks = markType ? [{ type: markType }] : []
      let hoverContent = []
      if (value.indexOf('[') > -1) {
        const splitBracketArr = value.split('[')
        if (splitBracketArr && splitBracketArr.length > 0) {
          const textHoverArr = splitBracketArr.flatMap((item) => {
            let constructObj
            if (item.indexOf(']') > -1) {
              const splitValue = item.split(']')
              const hoverText = splitValue[0]
              let remainingText = splitValue[1].replace(/[(]/g, '').split(')')
              remainingText.unshift(hoverText)
              constructObj = Object.assign(
                {},
                { hoverText: remainingText[0] },
                { link: remainingText[1] },
                remainingText[2] ? { text: remainingText[2] } : null
              )
              return constructObj
            } else {
              constructObj = { text: item }
              return constructObj
            }
          })

          textHoverArr.map((item) => {
            let contentText1, contentText2
            if (Object.keys(item).includes('hoverText')) {
              contentText1 = {
                nodeType: 'asset-hyperlink',
                content: [nestedContent(item.hoverText)],
                data: {
                  target: {
                    fields: {
                      title: 'Copy of MEXICO - LorenaR01 1',
                      file: {
                        url: item.link,
                        details: {
                          image: {
                            width: 1549,
                            height: 1549,
                          },
                        },
                        fileName: 'Copy_of_MEXICO_-_LorenaR01__1_.jpg',
                        contentType: 'image/jpeg',
                      },
                    },
                  },
                },
              }

              if (item.text) {
                contentText2 = nestedContent(item.text)
                hoverContent.push(contentText1, contentText2)
              } else {
                hoverContent.push(contentText1)
              }
              return item
            }
            contentText1 = nestedContent(item.text)
            hoverContent.push(contentText1)
            return item
          })
        }
      }

      const normalContent = [
        {
          data: {},
          marks,
          value: updatedValue,
          nodeType: 'text',
        },
      ]

      return {
        data: {},
        content:
          hoverContent && hoverContent.length > 0
            ? hoverContent
            : normalContent,
        nodeType: nodeType,
      }
    }

    const constructedTextVal = (data, sectionIndex) => {
      const output = data.map((item, index) => {
        const textVal =
          locale !== 'en' &&
          currentLang[0].components[0].content_section[sectionIndex]
            .blocks_component.text_block[index].Text &&
          currentLang[0].components[0].content_section[sectionIndex]
            .blocks_component.text_block[index].Text !== ''
            ? currentLang[0].components[0].content_section[sectionIndex]
                .blocks_component.text_block[index].Text
            : item.Text

        const separateData = textVal.split('\n')
        const contentData = separateData.map((value) => customContent(value))

        return {
          sys: {
            contentType: {
              sys: {
                id: 'condeCodeTextBlock',
              },
            },
          },
          fields: {
            text: {
              data: {},
              content: contentData,
              nodeType: 'document',
            },
          },
        }
      })
      return output
    }

    const constructedMsgVal = (data, sectionIndex) => {
      const output = data.map((item, index) => {
        const textVal =
          locale !== 'en' &&
          currentLang[0].components[0].content_section[sectionIndex]
            .blocks_component.message_block[index].Text &&
          currentLang[0].components[0].content_section[sectionIndex]
            .blocks_component.message_block[index].Text !== ''
            ? currentLang[0].components[0].content_section[sectionIndex]
                .blocks_component.message_block[index].Text
            : item.Text

        const title =
          locale !== 'en' &&
          currentLang[0].components[0].content_section[sectionIndex]
            .blocks_component.message_block[index].Title &&
          currentLang[0].components[0].content_section[sectionIndex]
            .blocks_component.message_block[index].Title !== ''
            ? currentLang[0].components[0].content_section[sectionIndex]
                .blocks_component.message_block[index].Title
            : item.Title

        const separateData = textVal.split('\n')
        const contentData = separateData.map((value) => customContent(value))

        return {
          sys: {
            contentType: {
              sys: {
                id: 'condeCodeMessagesBlock',
              },
            },
          },
          fields: {
            title,
            text: {
              data: {},
              content: [
                {
                  data: {},
                  content: contentData,
                  nodeType: 'paragraph',
                },
              ],
              nodeType: 'document',
            },
            backgroundMedia: fetchCoverMedia(item.background_media),
          },
        }
      })
      return output
    }

    const constructedOverlayVal = (data, sectionIndex) => {
      const output = data.map((item, index) => {
        const textVal =
          locale !== 'en' &&
          currentLang[0].components[0].content_section[sectionIndex]
            .blocks_component.overlaying_text_block[index].Text &&
          currentLang[0].components[0].content_section[sectionIndex]
            .blocks_component.overlaying_text_block[index].Text !== ''
            ? currentLang[0].components[0].content_section[sectionIndex]
                .blocks_component.overlaying_text_block[index].Text
            : item.Text

        const title =
          locale !== 'en' &&
          currentLang[0].components[0].content_section[sectionIndex]
            .blocks_component.overlaying_text_block[index].Title &&
          currentLang[0].components[0].content_section[sectionIndex]
            .blocks_component.overlaying_text_block[index].Title !== ''
            ? currentLang[0].components[0].content_section[sectionIndex]
                .blocks_component.overlaying_text_block[index].Title
            : item.Title

        const separateData = textVal.split('\n')
        const contentData = separateData.map((value) => customContent(value))
        return {
          sys: {
            contentType: {
              sys: {
                id: 'condeCodeOverlayingTextBlock',
              },
            },
          },
          fields: {
            title,
            text: {
              nodeType: 'document',
              data: {},
              content: contentData,
            },
          },
        }
      })
      return output
    }

    const constructedFooterVal = (data, sectionIndex) => {
      const output = data.map((item, index) => {
        const title =
          locale !== 'en' &&
          currentLang[0].components[0].content_section[sectionIndex]
            .blocks_component.footer_block[index].Title &&
          currentLang[0].components[0].content_section[sectionIndex]
            .blocks_component.footer_block[index].Title !== ''
            ? currentLang[0].components[0].content_section[sectionIndex]
                .blocks_component.footer_block[index].Title
            : item.Title

        return {
          sys: {
            contentType: {
              sys: {
                id: 'condeCodeFooterBlock',
              },
            },
          },
          fields: {
            title,
            media: fetchCoverMedia(item.Media),
          },
        }
      })
      return output
    }

    const constructedCarouselVal = (data, sectionIndex) => {
      const output = data.map((item, index) => {
        const title =
          locale !== 'en' &&
          currentLang[0].components[0].content_section[sectionIndex]
            .blocks_component.carousel_block[index] &&
          currentLang[0].components[0].content_section[sectionIndex]
            .blocks_component.carousel_block[index].Title &&
          currentLang[0].components[0].content_section[sectionIndex]
            .blocks_component.carousel_block[index].Title !== ''
            ? currentLang[0].components[0].content_section[sectionIndex]
                .blocks_component.carousel_block[index].Title
            : item.Title

        const composeArr = item.Images.map((sub) => fetchCoverMedia(sub))
        return {
          sys: {
            contentType: {
              sys: {
                id: 'condeCodeCarouselBlock',
              },
            },
          },
          fields: {
            title,
            images: composeArr,
            reverse: item.Reverse,
          },
        }
      })
      return output
    }

    const constructedListItemVal = (data, sectionIndex, blockIndex) => {
      const output = data.map((item, index) => {
        const title =
          locale !== 'en' &&
          currentLang[0].components[0].content_section[sectionIndex]
            .blocks_component.list_block[blockIndex].list_item[index].Title &&
          currentLang[0].components[0].content_section[sectionIndex]
            .blocks_component.list_block[blockIndex].list_item[index].Title !==
            ''
            ? currentLang[0].components[0].content_section[sectionIndex]
                .blocks_component.list_block[blockIndex].list_item[index].Title
            : item.Title

        const textVal =
          locale !== 'en' &&
          currentLang[0].components[0].content_section[sectionIndex]
            .blocks_component.list_block[blockIndex].list_item[index].Text &&
          currentLang[0].components[0].content_section[sectionIndex]
            .blocks_component.list_block[blockIndex].list_item[index].Text !==
            ''
            ? currentLang[0].components[0].content_section[sectionIndex]
                .blocks_component.list_block[blockIndex].list_item[index].Text
            : item.Text

        const separateData = textVal.split('\n')
        const contentData = separateData.map((value) => customContent(value))
        return {
          sys: {
            contentType: {
              sys: {
                id: 'condeCodeListItem',
              },
            },
          },
          fields: {
            title,
            text: {
              data: {},
              content: contentData,
              nodeType: 'document',
            },
            media1: fetchCoverMedia(item.Media_1),
            media2: fetchCoverMedia(item.Media_2),
          },
        }
      })
      return output
    }

    const constructedListBlockVal = (data, sectionIndex) => {
      const output = data.map((item, index) => {
        const title =
          locale !== 'en' &&
          currentLang[0].components[0].content_section[sectionIndex]
            .blocks_component.list_block[index].Title &&
          currentLang[0].components[0].content_section[sectionIndex]
            .blocks_component.list_block[index].Title !== ''
            ? currentLang[0].components[0].content_section[sectionIndex]
                .blocks_component.list_block[index].Title
            : item.Title

        return {
          sys: {
            contentType: {
              sys: {
                id: 'condeCodeListBlock',
              },
            },
          },
          fields: {
            title,
            listOfItems: constructedListItemVal(
              item.list_item,
              sectionIndex,
              index
            ),
          },
        }
      })
      return output
    }

    const blockArr = (data, sectionIndex) => {
      let result = Object.entries(data)
      const expected =
        result &&
        result.length > 0 &&
        result
          .flatMap((item) => {
            if (item[1].length === 0) return null
            switch (item[0]) {
              case 'text_block':
                return constructedTextVal(item[1], sectionIndex)
              case 'carousel_block':
                return constructedCarouselVal(item[1], sectionIndex)
              case 'list_block':
                return constructedListBlockVal(item[1], sectionIndex)
              case 'message_block':
                return constructedMsgVal(item[1], sectionIndex)
              case 'overlaying_text_block':
                return constructedOverlayVal(item[1], sectionIndex)
              case 'footer_block':
                return constructedFooterVal(item[1], sectionIndex)
              default:
                return null
            }
          })
          .filter((sub) => sub)

      if (sectionIndex === 0) {
        ;[expected[0], expected[1]] = [expected[1], expected[0]]
      }
      if (sectionIndex === 2) {
        expected.push(expected.shift())
      }
      return expected
    }

    const customizeDataArray = ({ type, record }) => {
      if (record && record.length > 0) {
        if (type === 'landingSlideshow') {
          return record.map((item) => fetchCoverMedia(item))
        } else if (type === 'sectionData') {
          const composeArr = record.map((item, index) => {
            const title =
              locale !== 'en' &&
              currentLang[0].components[0].content_section[index].Title &&
              currentLang[0].components[0].content_section[index].Title !== ''
                ? currentLang[0].components[0].content_section[index].Title
                : item.Title
            const headerTitle =
              locale !== 'en' &&
              currentLang[0].components[0].content_section[index]
                .Header_Title &&
              currentLang[0].components[0].content_section[index]
                .Header_Title !== ''
                ? currentLang[0].components[0].content_section[index]
                    .Header_Title
                : item.Header_Title
            const longText =
              locale !== 'en' &&
              currentLang[0].components[0].content_section[index].Long_Text &&
              currentLang[0].components[0].content_section[index].Long_Text !==
                ''
                ? currentLang[0].components[0].content_section[index].Long_Text
                : item.Long_Text

            return {
              fields: {
                title,
                headerTitle,
                coverMedia: fetchCoverMedia(item.Cover_Media),
                longText,
                blocks: blockArr(item.blocks_component, index),
              },
            }
          })
          return composeArr
        }
      } else {
        return []
      }
    }

    const title =
      locale !== 'en' && currentLang[0].components[0].Title !== ''
        ? currentLang[0].components[0].Title
        : entryval[0].components[0].Title

    const requestData = {
      fields: {
        title,
        landingSlideshow: customizeDataArray({
          type: 'landingSlideshow',
          record: entryval[0].components[0].Landing_Slideshow,
        }),
        sections: customizeDataArray({
          type: 'sectionData',
          record: entryval[0].components[0].content_section,
        }),
      },
    }

    const customizeLocale = localesList.map((item) => {
      return {
        code: item.code,
        name: item.name,
        default: item.isDefault,
      }
    })
    return {
      req: requestData,
      locales: {
        items: customizeLocale,
      },
    }
  } catch (e) {
    console.log('Connection Error', e)
  }
}

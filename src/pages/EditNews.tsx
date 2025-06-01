import React, { useEffect, useState } from "react";
import RichTextEditor from "../components/RichTextEditor";
import { getBlogById, updateBlog, uploadBlog } from "../apis/blogs.api";
import Loading from "../components/Loading";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { PATH } from "../constants/path";
import { SRC } from "../constants/src";

interface EditNewsProps {
  title?: string;
  subtitle?: string;
  cover?: File;
  content?: string;
}

/**
 * EditNews component allows editing news articles with a title, subtitle, cover image, and content.
 *
 * @component
 * @param {EditNewsProps} props - The properties for the EditNews component.
 * @param {string} props.title - The title of the news article.
 * @param {string} props.subtitle - The subtitle of the news article.
 * @param {string} props.cover - The cover image URL of the news article.
 * @param {string} props.content - The content of the news article.
 *
 * @returns {JSX.Element} The rendered EditNews component.
 *
 * @example
 * <EditNews
 *   title="Sample Title"
 *   subtitle="Sample Subtitle"
 *   cover="https://example.com/cover.jpg"
 *   content="<p>Sample content</p>"
 * />
 */

const EditNews: React.FC = () => {
  const [news, setNews] = useState<EditNewsProps>({});
  const [imagePreview, setImagePreview] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const isEditMode = location.pathname.includes("edit");
  const params = useParams();
  useEffect(() => {
    const fetchBlog = async () => {
      const { data } = await getBlogById(params.id as string);
      console.log(data);

      setNews(data);
      setImagePreview(SRC.blog_cover + data.cover_url);
    };

    if (isEditMode) {
      fetchBlog();
    }
  }, [isEditMode, params.id]);

  const navigate = useNavigate();
  const handleChange =
    (name: keyof EditNewsProps) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      if (name === "cover") {
        const file = (e.target as HTMLInputElement).files?.[0];
        console.log(file);

        if (file) {
          const imageURL = URL.createObjectURL(file);
          setNews({ ...news, cover: file });
          setImagePreview(imageURL);
        }
      } else {
        setNews({ ...news, [name]: e.target.value });
      }
    };

  const handleContentChange = (content: string) => {
    setNews({ ...news, content });
  };

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    setIsLoading(true);
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", news.title as string);
    formData.append("subtitle", news.subtitle as string);
    formData.append("cover", news.cover as File);
    formData.append("content", news.content as string);
    if (!isEditMode) {
      try {
        await uploadBlog(formData);
        navigate(PATH.admin.view_news);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    } else {
      try {
        await updateBlog(params.id as string, formData);
        navigate(PATH.admin.view_news);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <>
      {isLoading ? <Loading /> : null}
      <div className="flex flex-col gap-[50px]">
        <div className="flex flex-col bg-[#61A8FA] bg-opacity-[10%] w-full px-[20px] md:px-[50px] lg:px-[100px] xl:px-[200px] py-[60px]">
          <div className="flex flex-col lg:flex-row gap-[20px] lg:gap-[70px]">
            <div className="flex flex-col bg-[#FFFFFF] bg-opacity-[50%] rounded-[14px] border-[1px] border-[#000000] border-dashed px-[20px] py-[50px] lg:py-[163px] w-full lg:w-[350px] h-[350px] min-w-[350px] min-h-[350px] justify-center ">
              <input
                type="file"
                id="upload-ads"
                className="hidden"
                onChange={handleChange("cover")}
                accept="image/*"
              />
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className=" h-64 object-cover rounded"
                />
              )}
              <label
                htmlFor="upload-ads"
                className="bg-[#223A60] bg-opacity-[50%] rounded-[14px] px-[10px] py-[15px] shadow-lg text-[#FFFFFF] text-[16px] font-medium w-[50%] self-center text-center hover:scale-[1.05] transform transition-transform duration-200 hover:bg-opacity-[70%]"
              >
                Add photo
              </label>
            </div>

            <div className="flex flex-col gap-[10px] w-full">
              <textarea
                name="title"
                placeholder="Enter title"
                className="w-full bg-transparent text-[#223A60] text-[24px] lg:text-[48px] font-bold resize-none border-[1px] border-[#000000] border-opacity-[50%] border-dashed"
                maxLength={40}
                rows={2}
                value={news.title}
                onChange={handleChange("title")}
              />
              <textarea
                placeholder="Enter subtitle"
                className="w-full bg-transparent text-[#223A60] opacity-[70%] text-[16px] lg:text-[24px] font-medium resize-none border-[1px] border-[#000000] border-opacity-[50%] border-dashed"
                maxLength={160}
                rows={5}
                value={news.subtitle}
                onChange={handleChange("subtitle")}
              />
            </div>
          </div>

          <div className="text-[#223A60] text-[24px] lg:text-[32px] font-bold my-[50px]">
            Insert content in the Text Editor below
          </div>

          <RichTextEditor
            initalValue={news.content}
            change={handleContentChange}
          />
          <div className="flex md:justify-end justify-center mt-5">
            <button
              className="bg-blue-300 w-[200px] md:max-w-[200px] py-3 px-2 rounded-[20px] hover:bg-blue-400"
              onClick={(e) => handleClick(e)}
            >
              {isEditMode ? "Save Blog" : "Upload Blog"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditNews;

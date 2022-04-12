import path from "path";
import fs from 'fs';
import matter from "gray-matter";
import { remark } from "remark";
import html from 'remark-html';

const postDirectory = path.join(process.cwd() , "posts");

// mdファイルのデータ
export function getPostsData(){
    const fileNames = fs.readdirSync(postDirectory);
    console.log("fileNames",fileNames);
    console.log("postDirectory",postDirectory);
    const allPostsData = fileNames.map(filename => {
        const id = filename.replace(/\.md$/ , "");//ファイル名(Id)

        //マークダウンファイルを文字列として読み取る
        const fullPath = path.join(postDirectory , filename);
        console.log("fullPath",fullPath);
        const fileContents = fs.readFileSync(fullPath , "utf-8");

        const matterResult = matter(fileContents);

        // idとデータを返す
        return{
            id , 
            ...matterResult.data
        }
    });
    console.log("allPostsData",allPostsData)
    return allPostsData;
}

// getStaticPathでreturnで使うPathを取得する
export function getAllPostIds(){
    const fileNames = fs.readdirSync(postDirectory);
    return fileNames.map(filename => {
        return {
            params:{
                id:filename.replace(/\.md$/ , ""),
            }
        }
    })
}


// Idに基づいてブログ投稿データを返す
export async function getPostData(id){
    const fullPath = path.join(postDirectory , `${id}.md`);
    const fileContent = fs.readFileSync(fullPath, "utf-8");

    const matterResult = matter(fileContent);

    const blogContent = await remark().use(html).process(matterResult.content);

    const blogContentHtml = blogContent.toString();
    return {
        id,
        blogContentHtml,
        ...matterResult.data,
    }
}

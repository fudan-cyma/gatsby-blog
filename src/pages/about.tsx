import React from 'react';
import { Link } from 'gatsby';

import Layout from '../components/layout';

const About = () => (
	<Layout className="about" title="关于我">
		<h2>关于我~</h2>
		<p>95年生人,男,来自浙江,曾居丽水/宁波/金华/上海, 现居亚特兰大</p>
		<p>
			在某个卖家居建材公司做data analyst, 但出于种种原因每天更多的时间在写full
			stack web application.
		</p>
		<p>本科学经济, 研究生学数据分析,现在算是个新手程序员</p>
		<p>
			不知道这个网站能不能算是一个博客. 暂时还是只会放一些学习笔记上来,
			等有能力写作了内容应该会更丰富一些. 或者有时间了放些游戏的测评,
			但是我太菜了
		</p>
		<p>网站的名字来自于明日方舟的白面鸮(Ptilopsis), 她超可爱的</p>
		<p>
			ACT/ARPG/FPS玩家, ps4/switch/pc, 喜欢听重金属/前卫摇滚/激流/jpop,
			(假装)在学吉他, 喜欢做菜但是懒得做, 喜欢看推理小说和犯罪片
		</p>
		<p>
			网站的模板来自于
			<a href={'https://github.com/zhouyuexie/gatsby-starter-quiet'}>
				@zhouyuexie
			</a>
		</p>
		<Link className="goback" to="/">
			Back
		</Link>
	</Layout>
);

export default About;

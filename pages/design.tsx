import { Image, LogoSVG } from 'common';
import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';

const DesignSystem: NextPage = () => {
  return (
    <div className='main-container'>
      <Head>
        <title>Create Next App</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main className='body-100'>
        <div className='flex items-center justify-between'>
          <Link href={'/'} passHref>
            <a>
              <span>
                <LogoSVG className='text-primary-500 dark:text-neutral-100' />
              </span>
              <span className='sr-only'>Logo and Link</span>
              {/* <Image
                src={'/assets/images/logo.svg'}
                alt='logo'
                width={'28'}
                height='26'
              /> */}
            </a>
          </Link>
          <h1>Design System</h1>
        </div>

        <section>
          <h2 className='text-primary-500'>Colors</h2>
          {/* BOXES */}
          <ul className='grid grid-cols-fit-big gap-y-12 gap-x-8 text-neutral-100 font-bold'>
            <li className='py-16 px-10 border border-solid border-primary-300 rounded-2xl text-primary-300 bg-neutral-200 '>
              #F8F8FB
            </li>
            <li className='py-16 px-10 rounded-2xl text-primary-400 bg-primary-100 '>
              #DFE3FA
            </li>
            <li className='py-16 px-10 rounded-2xl bg-primary-200'>#9277FF</li>
            <li className='py-16 px-10 rounded-2xl bg-primary-300'>#888EB0</li>
            <li className='py-16 px-10 rounded-2xl bg-primary-400'>#7E88C3</li>
            <li className='py-16 px-10 rounded-2xl bg-primary-500'>#7C5DFA</li>
            <li className='py-16 px-10 rounded-2xl bg-primary-600'>#252945</li>
            <li className='py-16 px-10 rounded-2xl bg-primary-700'>#1E2139</li>
            <li className='py-16 px-10 rounded-2xl bg-primary-800'>#141625</li>
            <li className='py-16 px-10 rounded-2xl bg-primary-900'>#0C0E16</li>
            <li className='py-16 px-10 rounded-2xl bg-accent-100'>#FF9797</li>
            <li className='py-16 px-10 rounded-2xl bg-accent-200'>#EC5757</li>
          </ul>
        </section>
        <section>
          <h2 className='text-primary-500'>Typography</h2>
          <div>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Animi,
            rerum porro possimus, quas, libero ut numquam velit magni dolorum
            minima repellat itaque beatae maxime exercitationem quaerat
            asperiores sunt ipsa aliquam? Repudiandae, excepturi consectetur
            quis doloribus eaque culpa quos illo sapiente vero? Ut enim fugiat
            vero voluptates? Sint quas ratione incidunt quasi! Sit aliquam
            tenetur aliquid aspernatur iste, possimus fuga ipsam. Fugiat velit
            nobis consequatur? Sunt voluptatibus velit eius eos. Libero, rem
            fuga tempora delectus quibusdam harum? Quia dolorem saepe, cumque ea
            inventore praesentium error minima deserunt voluptatum nisi, impedit
            omnis! Numquam exercitationem commodi optio officia, architecto
            aperiam consequatur modi tempora obcaecati temporibus cupiditate
            accusantium ab quas veniam. Ad eveniet itaque praesentium quae enim
            hic delectus quas nemo, numquam cum cupiditate. In aliquam
            temporibus dolor. Quas doloremque inventore quibusdam omnis quam
            sapiente non alias unde blanditiis ipsam. Nostrum quasi error illo
            sequi, facilis itaque officiis pariatur molestiae. Odit aspernatur
            exercitationem esse! Saepe laudantium doloribus quod itaque harum
            assumenda praesentium velit non iure tempora voluptatum rem corporis
            delectus quidem officiis, eligendi ut blanditiis inventore cumque
            consectetur quia pariatur odio distinctio? Repudiandae, doloremque.
            Quidem atque sequi sint consequatur non vel voluptatem accusamus
            adipisci iste facere velit ipsa eum rem, tempore quibusdam
            reprehenderit vitae. Adipisci, amet! Quaerat itaque impedit quia
            consectetur esse, minus minima. Repudiandae ullam alias reiciendis,
            laborum in quam. Numquam atque cupiditate minus in quo voluptates,
            eum voluptatibus delectus, debitis quisquam odio. Labore, possimus
            cumque porro alias hic recusandae reiciendis numquam molestias!
            Nemo, repellat. Aliquam nemo aliquid laudantium quasi tempora aut
            enim facere aspernatur recusandae amet totam velit molestiae
            architecto sunt delectus, ad ducimus, voluptas voluptatum quo natus?
            Dicta ad molestiae autem? Sed saepe rem eius soluta libero
            voluptatem officiis, omnis molestiae facere dolorum, repudiandae est
            quia odio officia voluptate quasi cum! Tempore omnis consectetur,
            earum minima et dolorem possimus praesentium porro. Quos
            necessitatibus fuga repellat molestias vitae, quaerat nemo fugit vel
            ab provident, eveniet vero. Rerum quos alias, optio saepe commodi ad
            culpa placeat autem? Fugiat ex corrupti distinctio possimus
            assumenda. Doloremque voluptate, reprehenderit laborum ut iste modi
            corrupti, officiis nihil quasi explicabo necessitatibus voluptas
            quidem ducimus accusantium ipsum nobis minus. Ut excepturi illum
            ducimus quibusdam pariatur minima laborum aliquid aspernatur? Rem
            amet, repellendus modi laudantium tempora eius vero molestias
            corrupti iste hic, eaque cum optio magni architecto, dolore nobis
            inventore! Eligendi provident numquam ullam quos nemo quisquam
            reiciendis blanditiis corporis. Aliquid, ab! Totam sapiente
            laboriosam eius nobis officiis. Dignissimos, hic excepturi eius
            repudiandae in explicabo incidunt nobis ullam quibusdam fugit
            perferendis iure, ipsa molestias quo corporis similique, vel autem
            quod. Sit numquam maiores possimus ut provident temporibus et
            deleniti est doloremque suscipit voluptatum eius veniam quos fuga
            voluptatibus accusamus repellat, cupiditate commodi incidunt. Ullam
            perspiciatis odio omnis eius, aut dolore! Omnis aperiam blanditiis
            sint accusamus! Quos possimus qui ducimus exercitationem minus at
            cumque ea, perferendis architecto odio excepturi reiciendis quod
            tenetur, modi omnis fuga numquam tempora eligendi saepe deserunt
            esse. Dolor dicta incidunt quibusdam. Adipisci quo est ut quos quia
            mollitia necessitatibus alias, velit excepturi omnis tempore enim
            numquam, itaque debitis commodi ipsa dignissimos quae labore
            corrupti neque ipsam expedita! Nihil aspernatur consequuntur dicta
            quo nesciunt, quia consectetur odio exercitationem earum assumenda
            non recusandae adipisci itaque et sit vero voluptatum nostrum ipsum.
            Eligendi sunt vero veniam voluptatibus, nemo harum reiciendis. Ut
            molestias rerum quibusdam odit non doloremque blanditiis atque
            fugiat, nihil unde? Totam odio animi corporis, voluptatem temporibus
            blanditiis, quisquam similique dolorem veritatis tenetur adipisci
            eveniet est quaerat perferendis. Quaerat? Perferendis corrupti
            eveniet sed, veniam debitis totam quisquam unde est minima dolorum
            doloribus explicabo, ab sint aliquam beatae quibusdam nostrum
            repellendus officiis omnis eum possimus fugiat molestiae alias
            tempore? Itaque. Sapiente, labore earum ex ipsa aliquam tempore,
            nulla ullam accusamus laboriosam dicta, enim ipsam velit. Molestiae
            ipsam odio ad at architecto perspiciatis inventore eveniet tenetur
            aperiam qui, a officiis nobis! Corrupti reiciendis ratione officiis
            dolor impedit veritatis! Cumque, dolores. Perferendis esse
            reprehenderit molestiae! Temporibus itaque alias officiis nihil
            consequuntur, sit at odio rerum eligendi deserunt quisquam expedita
            labore adipisci explicabo. Totam facilis nesciunt ratione. Quasi,
            provident optio dolor neque asperiores inventore non nemo ipsa
            expedita vitae similique omnis accusantium? Ipsa harum a itaque
            omnis neque earum, dicta autem saepe rerum? Numquam, illo
            perferendis ut harum quaerat dicta modi enim sequi aperiam
            architecto ullam delectus. Ipsa at deserunt aliquam molestiae
            cupiditate. Quia ipsam veniam at odit. Iusto est officiis veritatis
            facilis! Consequatur non, fugiat officia at eius amet necessitatibus
            nobis veniam enim numquam dolorum blanditiis labore ad nostrum
            pariatur? Corporis, molestiae quaerat id praesentium fugit non
            voluptas accusamus culpa laboriosam corrupti.
          </div>
        </section>
        <section>
          <h2 className='text-primary-500'>Buttons</h2>

          <div className='grid grid-cols-fit-big gap-y-12 gap-x-8'>
            <div>
              <button type='button' className='btn btn-invoice'>
                <span className='grid place-content-center rounded-full p-3 bg-neutral-200'>
                  <Image
                    src={'/assets/images/icon-plus.svg'}
                    alt='add invoice'
                    width='11'
                    height='11'
                  />
                </span>
                <span>New Invoice</span>
              </button>
            </div>
            <div>
              <button type='button' className='btn btn-paid'>
                Mark as Paid
              </button>
            </div>
            <div>
              <button type='button' className='btn btn-edit'>
                Edit
              </button>
            </div>

            <div>
              <button type='button' className='btn btn-draft'>
                Save as Draft
              </button>
            </div>
            <div>
              <button type='button' className='btn btn-delete'>
                Delete
              </button>
            </div>
            <div>
              <button type='button' className='btn btn-add'>
                &#43; Add New Item
              </button>
            </div>
          </div>
        </section>

        <section>
          <h2 className='text-primary-500'>Form Elements Light</h2>
          {/* FORM ELEMENTS LIGHT */}
          <ul className='grid gap-8 mb-8 md:grid-cols-3'>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
          </ul>
        </section>
        <section className='bg-primary-900 w-full-shadow'>
          <h2 className='text-primary'>Form Elements Dark</h2>
          {/* FORM ELEMENTS DARK */}
          <div></div>
        </section>
      </main>
    </div>
  );
};

export default DesignSystem;

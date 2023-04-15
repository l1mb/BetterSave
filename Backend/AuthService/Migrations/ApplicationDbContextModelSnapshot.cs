﻿// <auto-generated />
using System;
using AuthServiceApp.DAL.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace AuthServiceApp.Migrations
{
    [DbContext(typeof(ApplicationDbContext))]
    partial class ApplicationDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "6.0.15")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder, 1L, 1);

            modelBuilder.Entity("AuthServiceApp.DAL.Entities.Account.AccountEntity", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<float>("Balance")
                        .HasColumnType("real");

                    b.Property<string>("IconColor")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("IconName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("IsDeleted")
                        .HasColumnType("bit");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<Guid>("UserId")
                        .HasColumnType("uniqueidentifier");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("Account");
                });

            modelBuilder.Entity("AuthServiceApp.DAL.Entities.AimEntity", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<int>("AimType")
                        .HasColumnType("int");

                    b.Property<Guid?>("AimTypeEntityId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<float>("Amount")
                        .HasColumnType("real");

                    b.Property<DateTime>("FinishDate")
                        .HasColumnType("datetime2");

                    b.Property<bool>("IsDeleted")
                        .HasColumnType("bit");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<Guid>("UserId")
                        .HasColumnType("uniqueidentifier");

                    b.HasKey("Id");

                    b.HasIndex("AimTypeEntityId");

                    b.HasIndex("UserId")
                        .IsUnique();

                    b.ToTable("Aim");
                });

            modelBuilder.Entity("AuthServiceApp.DAL.Entities.AimTypeEntity", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<bool>("IsDeleted")
                        .HasColumnType("bit");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("AimType");
                });

            modelBuilder.Entity("AuthServiceApp.DAL.Entities.ApplicationRole", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken()
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("IsDeleted")
                        .HasColumnType("bit");

                    b.Property<string>("Name")
                        .HasMaxLength(256)
                        .HasColumnType("nvarchar(256)");

                    b.Property<string>("NormalizedName")
                        .HasMaxLength(256)
                        .HasColumnType("nvarchar(256)");

                    b.HasKey("Id");

                    b.HasIndex("NormalizedName")
                        .IsUnique()
                        .HasDatabaseName("RoleNameIndex")
                        .HasFilter("[NormalizedName] IS NOT NULL");

                    b.ToTable("AspNetRoles", (string)null);
                });

            modelBuilder.Entity("AuthServiceApp.DAL.Entities.ApplicationUser", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<int>("AccessFailedCount")
                        .HasColumnType("int");

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Email")
                        .HasMaxLength(256)
                        .HasColumnType("nvarchar(256)");

                    b.Property<bool>("EmailConfirmed")
                        .HasColumnType("bit");

                    b.Property<string>("FirstName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("IsDeleted")
                        .HasColumnType("bit");

                    b.Property<string>("LastName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("LockoutEnabled")
                        .HasColumnType("bit");

                    b.Property<DateTimeOffset?>("LockoutEnd")
                        .HasColumnType("datetimeoffset");

                    b.Property<string>("NormalizedEmail")
                        .HasMaxLength(256)
                        .HasColumnType("nvarchar(256)");

                    b.Property<string>("NormalizedUserName")
                        .HasMaxLength(256)
                        .HasColumnType("nvarchar(256)");

                    b.Property<string>("PasswordHash")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("PhoneNumber")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("PhoneNumberConfirmed")
                        .HasColumnType("bit");

                    b.Property<string>("SecurityStamp")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("TwoFactorEnabled")
                        .HasColumnType("bit");

                    b.Property<string>("UserName")
                        .HasMaxLength(256)
                        .HasColumnType("nvarchar(256)");

                    b.HasKey("Id");

                    b.HasIndex("Email");

                    b.HasIndex("NormalizedEmail")
                        .HasDatabaseName("EmailIndex");

                    b.HasIndex("NormalizedUserName")
                        .IsUnique()
                        .HasDatabaseName("UserNameIndex")
                        .HasFilter("[NormalizedUserName] IS NOT NULL");

                    b.HasIndex("UserName");

                    b.ToTable("AspNetUsers", (string)null);
                });

            modelBuilder.Entity("AuthServiceApp.DAL.Entities.ApplicationUserRole", b =>
                {
                    b.Property<Guid>("UserId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid>("RoleId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid?>("ApplicationRoleId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid?>("ApplicationUserId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid?>("ApplicationUserRoleRoleId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid?>("ApplicationUserRoleUserId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<bool>("IsDeleted")
                        .HasColumnType("bit");

                    b.HasKey("UserId", "RoleId");

                    b.HasIndex("ApplicationRoleId");

                    b.HasIndex("ApplicationUserId");

                    b.HasIndex("RoleId");

                    b.HasIndex("ApplicationUserRoleUserId", "ApplicationUserRoleRoleId");

                    b.ToTable("AspNetUserRoles", (string)null);
                });

            modelBuilder.Entity("AuthServiceApp.DAL.Entities.Categories.CategoryEntity", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Color")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Icon")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("IsDeleted")
                        .HasColumnType("bit");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<Guid>("UserId")
                        .HasColumnType("uniqueidentifier");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("Category");
                });

            modelBuilder.Entity("AuthServiceApp.DAL.Entities.Categories.SpendingCategory", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<bool>("IsDeleted")
                        .HasColumnType("bit");

                    b.Property<string>("Keywords")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("SpendingCategories");
                });

            modelBuilder.Entity("AuthServiceApp.DAL.Entities.Categories.SubCategoryEntity", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid>("CategoryId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Color")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Icon")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("IsDeleted")
                        .HasColumnType("bit");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("CategoryId");

                    b.ToTable("SubCategory");
                });

            modelBuilder.Entity("AuthServiceApp.DAL.Entities.LoanEntity", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<float>("Amount")
                        .HasColumnType("real");

                    b.Property<string>("Currency")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("IsDeleted")
                        .HasColumnType("bit");

                    b.Property<bool>("IsMine")
                        .HasColumnType("bit");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("ReturnDate")
                        .HasColumnType("datetime2");

                    b.Property<Guid>("UserId")
                        .HasColumnType("uniqueidentifier");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("Loans");
                });

            modelBuilder.Entity("AuthServiceApp.DAL.Entities.Operations.OperationEntity", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid>("AccountId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<DateTime?>("CreatedDate")
                        .HasColumnType("datetime2");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("IsDeleted")
                        .HasColumnType("bit");

                    b.Property<Guid?>("SubCategoryId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<int>("Type")
                        .HasColumnType("int");

                    b.Property<float>("Value")
                        .HasColumnType("real");

                    b.HasKey("Id");

                    b.HasIndex("AccountId");

                    b.HasIndex("SubCategoryId");

                    b.ToTable("Operation");
                });

            modelBuilder.Entity("AuthServiceApp.DAL.Entities.Shop", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Address")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("IsDeleted")
                        .HasColumnType("bit");

                    b.Property<string>("ShopName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Shops");
                });

            modelBuilder.Entity("AuthServiceApp.DAL.Entities.ShopPosition", b =>
                {
                    b.Property<Guid?>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Currency")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("IsDeleted")
                        .HasColumnType("bit");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(450)");

                    b.Property<float>("Price")
                        .HasColumnType("real");

                    b.Property<Guid>("SpendingCategoryId")
                        .HasColumnType("uniqueidentifier");

                    b.HasKey("Id");

                    b.HasIndex("Name");

                    b.HasIndex("SpendingCategoryId");

                    b.ToTable("ShopPositions");
                });

            modelBuilder.Entity("AuthServiceApp.DAL.Entities.Spending", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid?>("CardId")
                        .IsRequired()
                        .HasColumnType("uniqueidentifier");

                    b.Property<float>("Cost")
                        .HasColumnType("real");

                    b.Property<bool>("IsDeleted")
                        .HasColumnType("bit");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<Guid>("ShopId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<DateTime>("SpendingDate")
                        .HasColumnType("datetime2");

                    b.Property<Guid>("UserId")
                        .HasColumnType("uniqueidentifier");

                    b.HasKey("Id");

                    b.HasIndex("CardId");

                    b.HasIndex("ShopId");

                    b.HasIndex("UserId");

                    b.ToTable("Spendings");
                });

            modelBuilder.Entity("AuthServiceApp.DAL.Interfaces.res", b =>
                {
                    b.ToView(null);
                });

            modelBuilder.Entity("AuthServiceApp.DAL.Repo.Card.CardEntity", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<float>("Balance")
                        .HasColumnType("real");

                    b.Property<string>("CardNumber")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Currency")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("IsDeleted")
                        .HasColumnType("bit");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<Guid?>("UserId")
                        .IsRequired()
                        .HasColumnType("uniqueidentifier");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("Cards");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<System.Guid>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<string>("ClaimType")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ClaimValue")
                        .HasColumnType("nvarchar(max)");

                    b.Property<Guid>("RoleId")
                        .HasColumnType("uniqueidentifier");

                    b.HasKey("Id");

                    b.HasIndex("RoleId");

                    b.ToTable("AspNetRoleClaims", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<System.Guid>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<string>("ClaimType")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ClaimValue")
                        .HasColumnType("nvarchar(max)");

                    b.Property<Guid>("UserId")
                        .HasColumnType("uniqueidentifier");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserClaims", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<System.Guid>", b =>
                {
                    b.Property<string>("LoginProvider")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("ProviderKey")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("ProviderDisplayName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<Guid>("UserId")
                        .HasColumnType("uniqueidentifier");

                    b.HasKey("LoginProvider", "ProviderKey");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserLogins", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<System.Guid>", b =>
                {
                    b.Property<Guid>("UserId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("LoginProvider")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("Value")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("UserId", "LoginProvider", "Name");

                    b.ToTable("AspNetUserTokens", (string)null);
                });

            modelBuilder.Entity("ShopPositionSpending", b =>
                {
                    b.Property<Guid>("ShopPositionsId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid>("SpendingsId")
                        .HasColumnType("uniqueidentifier");

                    b.HasKey("ShopPositionsId", "SpendingsId");

                    b.HasIndex("SpendingsId");

                    b.ToTable("ShopPositionSpending");
                });

            modelBuilder.Entity("AuthServiceApp.DAL.Entities.Account.AccountEntity", b =>
                {
                    b.HasOne("AuthServiceApp.DAL.Entities.ApplicationUser", "User")
                        .WithMany("UserAccounts")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("User");
                });

            modelBuilder.Entity("AuthServiceApp.DAL.Entities.AimEntity", b =>
                {
                    b.HasOne("AuthServiceApp.DAL.Entities.AimTypeEntity", null)
                        .WithMany("AimEntities")
                        .HasForeignKey("AimTypeEntityId");

                    b.HasOne("AuthServiceApp.DAL.Entities.ApplicationUser", "User")
                        .WithOne("Aim")
                        .HasForeignKey("AuthServiceApp.DAL.Entities.AimEntity", "UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("User");
                });

            modelBuilder.Entity("AuthServiceApp.DAL.Entities.ApplicationUserRole", b =>
                {
                    b.HasOne("AuthServiceApp.DAL.Entities.ApplicationRole", null)
                        .WithMany("UserRoles")
                        .HasForeignKey("ApplicationRoleId");

                    b.HasOne("AuthServiceApp.DAL.Entities.ApplicationUser", null)
                        .WithMany("UserRoles")
                        .HasForeignKey("ApplicationUserId");

                    b.HasOne("AuthServiceApp.DAL.Entities.ApplicationRole", null)
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("AuthServiceApp.DAL.Entities.ApplicationUser", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("AuthServiceApp.DAL.Entities.ApplicationUserRole", null)
                        .WithMany("UserRoles")
                        .HasForeignKey("ApplicationUserRoleUserId", "ApplicationUserRoleRoleId");
                });

            modelBuilder.Entity("AuthServiceApp.DAL.Entities.Categories.CategoryEntity", b =>
                {
                    b.HasOne("AuthServiceApp.DAL.Entities.ApplicationUser", "User")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("User");
                });

            modelBuilder.Entity("AuthServiceApp.DAL.Entities.Categories.SubCategoryEntity", b =>
                {
                    b.HasOne("AuthServiceApp.DAL.Entities.Categories.CategoryEntity", "Category")
                        .WithMany("Subcategories")
                        .HasForeignKey("CategoryId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Category");
                });

            modelBuilder.Entity("AuthServiceApp.DAL.Entities.LoanEntity", b =>
                {
                    b.HasOne("AuthServiceApp.DAL.Entities.ApplicationUser", "User")
                        .WithMany("Loans")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("User");
                });

            modelBuilder.Entity("AuthServiceApp.DAL.Entities.Operations.OperationEntity", b =>
                {
                    b.HasOne("AuthServiceApp.DAL.Entities.Account.AccountEntity", "Account")
                        .WithMany("Operations")
                        .HasForeignKey("AccountId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("AuthServiceApp.DAL.Entities.Categories.SubCategoryEntity", "SubCategory")
                        .WithMany("Operations")
                        .HasForeignKey("SubCategoryId");

                    b.Navigation("Account");

                    b.Navigation("SubCategory");
                });

            modelBuilder.Entity("AuthServiceApp.DAL.Entities.ShopPosition", b =>
                {
                    b.HasOne("AuthServiceApp.DAL.Entities.Categories.SpendingCategory", "SpendingCategory")
                        .WithMany("ShopPositions")
                        .HasForeignKey("SpendingCategoryId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("SpendingCategory");
                });

            modelBuilder.Entity("AuthServiceApp.DAL.Entities.Spending", b =>
                {
                    b.HasOne("AuthServiceApp.DAL.Repo.Card.CardEntity", "Card")
                        .WithMany("Spendings")
                        .HasForeignKey("CardId")
                        .OnDelete(DeleteBehavior.NoAction)
                        .IsRequired();

                    b.HasOne("AuthServiceApp.DAL.Entities.Shop", "Shop")
                        .WithMany("Spendings")
                        .HasForeignKey("ShopId")
                        .OnDelete(DeleteBehavior.NoAction)
                        .IsRequired();

                    b.HasOne("AuthServiceApp.DAL.Entities.ApplicationUser", "User")
                        .WithMany("Spendings")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.NoAction)
                        .IsRequired();

                    b.Navigation("Card");

                    b.Navigation("Shop");

                    b.Navigation("User");
                });

            modelBuilder.Entity("AuthServiceApp.DAL.Repo.Card.CardEntity", b =>
                {
                    b.HasOne("AuthServiceApp.DAL.Entities.ApplicationUser", "User")
                        .WithMany("Cards")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.NoAction)
                        .IsRequired();

                    b.Navigation("User");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<System.Guid>", b =>
                {
                    b.HasOne("AuthServiceApp.DAL.Entities.ApplicationRole", null)
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<System.Guid>", b =>
                {
                    b.HasOne("AuthServiceApp.DAL.Entities.ApplicationUser", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<System.Guid>", b =>
                {
                    b.HasOne("AuthServiceApp.DAL.Entities.ApplicationUser", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<System.Guid>", b =>
                {
                    b.HasOne("AuthServiceApp.DAL.Entities.ApplicationUser", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("ShopPositionSpending", b =>
                {
                    b.HasOne("AuthServiceApp.DAL.Entities.ShopPosition", null)
                        .WithMany()
                        .HasForeignKey("ShopPositionsId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("AuthServiceApp.DAL.Entities.Spending", null)
                        .WithMany()
                        .HasForeignKey("SpendingsId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("AuthServiceApp.DAL.Entities.Account.AccountEntity", b =>
                {
                    b.Navigation("Operations");
                });

            modelBuilder.Entity("AuthServiceApp.DAL.Entities.AimTypeEntity", b =>
                {
                    b.Navigation("AimEntities");
                });

            modelBuilder.Entity("AuthServiceApp.DAL.Entities.ApplicationRole", b =>
                {
                    b.Navigation("UserRoles");
                });

            modelBuilder.Entity("AuthServiceApp.DAL.Entities.ApplicationUser", b =>
                {
                    b.Navigation("Aim")
                        .IsRequired();

                    b.Navigation("Cards");

                    b.Navigation("Loans");

                    b.Navigation("Spendings");

                    b.Navigation("UserAccounts");

                    b.Navigation("UserRoles");
                });

            modelBuilder.Entity("AuthServiceApp.DAL.Entities.ApplicationUserRole", b =>
                {
                    b.Navigation("UserRoles");
                });

            modelBuilder.Entity("AuthServiceApp.DAL.Entities.Categories.CategoryEntity", b =>
                {
                    b.Navigation("Subcategories");
                });

            modelBuilder.Entity("AuthServiceApp.DAL.Entities.Categories.SpendingCategory", b =>
                {
                    b.Navigation("ShopPositions");
                });

            modelBuilder.Entity("AuthServiceApp.DAL.Entities.Categories.SubCategoryEntity", b =>
                {
                    b.Navigation("Operations");
                });

            modelBuilder.Entity("AuthServiceApp.DAL.Entities.Shop", b =>
                {
                    b.Navigation("Spendings");
                });

            modelBuilder.Entity("AuthServiceApp.DAL.Repo.Card.CardEntity", b =>
                {
                    b.Navigation("Spendings");
                });
#pragma warning restore 612, 618
        }
    }
}
